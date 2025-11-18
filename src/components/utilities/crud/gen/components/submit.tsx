/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteFormKeys } from "../../../../../app/slices/forms/forms.type";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../app/slices/hooks";
import { openDeleteModal } from "../../../../../app/slices/modal/modal.types";
import { deleteEmptyKeysAndValues } from "../../../delete-empty-kv";
import { validateFormKeys } from "../../../forms/hooks/validateFields";
import { myIcons } from "../../../icons";
import CustomModal from "../../../modal/modal";
import StyledButton from "../../../styles/buton";
import Loading from "../../../styles/loading";
import { splitByUppercase } from "../../../utils";
import DeleteModal from "../../delete";
import { CruI } from "../interface.gen";

export function SubmitCrud({ data }: { data: CruI }) {
  const name = data.name.toLowerCase().trim();
  const fieldName = name.split(" ").join("-") + "-form";

  const field: Record<string, any> = {};
  const requiredField: Record<string, string> = {};
  const selector = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  data.headings.forEach((heading) => {
    if (heading.formType === "obj" && heading.child) {
      heading.child.forEach((el) => {
        const va = splitByUppercase(el.key).join("-");
        field[el.key] = `${fieldName}-${va}`;
        if (el.required) {
          requiredField[el.key] = `${fieldName}-${va}`;
        }
      });
    } else {
      const val = splitByUppercase(heading.key).join("-");
      field[heading.key] = `${fieldName}-${val}`;
      if (heading.required) {
        requiredField[heading.key] = `${fieldName}-${val}`;
      }
    }
  });
  const [call, setCall] = useState(true);
  const [_status, setStatus] = useState<
    "isLoading" | "isSuccess" | "isError" | "none"
  >("none");
  const navigate = useNavigate();
  const showDeleteButton =
    data.showButton && data.showButton.deleteButton
      ? data.showButton.deleteButton
      : false;
  const showUpdateButton =
    data.showButton && data.showButton.updateButton
      ? data.showButton.updateButton
      : false;

  useEffect(() => {
    if (data.update && data.update?.updateStatus) {
      switch (data.update?.updateStatus) {
        case "error": {
           let er = "error updating " + data.name;

           if (data.create?.errorMessage) {
             if (typeof data.create?.errorMessage === "string") {
               er = data.create?.errorMessage;
             } else {
               if (data.create?.errorMessage.data) {
                 if (typeof data.create?.errorMessage.data === "string") {
                   er = data.create?.errorMessage.data;
                 } else {
                   if (data.create?.errorMessage.data.message=== "string") {
                     er = data.create?.errorMessage.data.message;
                   }
                 }
               }
             }
           }

           toast.error(er);
      
          break;}
        case "success":
          toast.success("updated " + data.name+ " successfully");
          break;
        default:
          "";
      }
    }
    if (data.create && data.create?.createStatus) {
      switch (data.create?.createStatus) {
        case "error":{
  

          let er = "error creating " + data.name;

          if (data.create?.errorMessage) {
            if (typeof data.create?.errorMessage === "string") {
              er = data.create?.errorMessage;
            } else {
              if (data.create?.errorMessage.data) {
                if (typeof data.create?.errorMessage.data === "string") {
                  er = data.create?.errorMessage.data;
                }
                else {
                  if (data.create?.errorMessage.data.message) {
                    er = data.create?.errorMessage.data.message;
                  } 
                }
              }
              
            }
          }
            
          toast.error(
            er
          );
          break;}
        case "success":
          toast.success("created "+data.name+" successfully");
          break;
        default:
          "";
      }
    }
    if (data.delete && data.delete?.deleteStatus) {
      switch (data.delete?.deleteStatus) {
        case "error":{


          
          let er = "error deleting " + data.name

          if (data.create?.errorMessage) {
            if (typeof data.create?.errorMessage === "string") {
              er = data.create?.errorMessage;
            } else {
              if (data.create?.errorMessage.data) {
                if (typeof data.create?.errorMessage.data === "string") {
                  er = data.create?.errorMessage.data;
                }
                else {
                  if (data.create?.errorMessage.data.message) {
                    er = data.create?.errorMessage.data.message;
                  } 
                }
              }
              
            }
          }
            
          toast.error(
            er
          );
     
          break;}
        case "success":
          toast.success("deleted successfully");
          break;
        default:
          "";
      }
    }
  }, [data.create, data.delete, data.name, data.update]);
  async function submit() {
    try {
      const obj: Record<string, any> = {};
      Object.entries(field).map(([key, value]) => {
        if (selector[value] && selector[value]?.value !== undefined) {
          obj[key] = selector[value]?.value;
        }
      });

      const deleteEmptyKV = deleteEmptyKeysAndValues(obj);

      // delete the array of objects
      



      if (call) {
        
        if (data.type === "UPDATE") {
          
          if (data.update && data.update.update) {
          const submit = await data.update.update(deleteEmptyKV);

          setStatus(submit);

          if (
            data.update?.updateStatus === "success" ||
            submit === "isSuccess"
          ) {
 
            dispatch(deleteFormKeys(Object.values(field)));
          }
        }}
        if (data.type === "CREATE") {
          const validateValues: Record<string, any> = {};
          Object.entries(requiredField).map(([_, value]) => {
            validateValues[value] = selector[value];
          });
          const validator = validateFormKeys(validateValues, dispatch);
          //console.log(data.create && data.create.create, validator);
          if (data.create && data.create.create && validator) {
            const submit = await data.create.create(deleteEmptyKV);
            setStatus(submit);

            if (
              data.create?.createStatus === "success" ||
              submit === "isSuccess"
            ) {
              dispatch(deleteFormKeys(Object.values(field)));
            }
          }
        }
        if (
          data.update?.updateStatus === "success" ||
          data.create?.createStatus === "success" ||
          data.delete?.deleteStatus === "success"
        ) {
          navigate(-1);
        }

        setCall(false);
        const setT = setTimeout(() => {
          setCall(true);
        }, 3000);
        return () => {
          clearTimeout(setT);
        };
      }
    } catch (e) {
      //console.log(e);
    }
  }
  return (
    <>
      {data.delete && (
        <CustomModal
          children={
            <DeleteModal
              props={{
                id: data.id,
                confirm: data.delete.delete,
                metadata: data.delete.deleteMetaData,
                isLoading: data.delete?.deleteStatus === "loading",
              }}
            />
          }
        />
      )}
      <div className="lg:px-6 sm:px-6   text-gray-900 md:px-6">
        <div className="flex flex-col justify-items-end place-items-end  pr-2 pb-2 align-middle ">
          {" "}
          {data.type !== "VIEW" && (
            <StyledButton
              className="  bg-primary elevated  max-h-16 px-1"
              onClick={submit}
            >
              {!(
                data.update?.updateStatus === "loading" ||
                data.create?.createStatus === "loading"
              ) && (
                <i className="submerged_button w-8 h-8">
                  {data.type === "CREATE" && (
                    <div className=" text-white w-6 h-6 ">
                      <myIcons.PlusIcon />
                    </div>
                  )}
                  {data.type === "UPDATE" && (
                    <div className=" text-white w-6 h-6 ">
                      <myIcons.IconCircuitChangeover />
                    </div>
                  )}
                </i>
              )}{" "}
              {(data.update?.updateStatus === "loading" ||
                data.create?.createStatus === "loading") && (
                <div className="pb-0 px-2  pt-1">
                  <Loading transparent color="white" size={20} />
                </div>
              )}
              <Typography
                fontSize={"16px"}
                className="text-bold pr-[2px] text-white  "
              >
                {data.buttonName ?? data.type.toLowerCase()}
              </Typography>{" "}
            </StyledButton>
          )}
          {data.type === "VIEW" && (
            <div className="flex flex-row ">
              {showUpdateButton && (
                // <NavLink
                //   to={
                //     data.update && data.update.updateRoute
                //       ? data.update.updateRoute
                //       : "/"
                //   }
                // >

                <StyledButton className="  bg-[var(--gray-0)] submerged   max-h-16  mx-1 ">
                  <i className="submerged_button w-8 h-8">
                    <div className=" text-black w-6 h-6 ">
                      <myIcons.IconCircuitChangeover />
                    </div>
                  </i>{" "}
                  <Typography fontSize={"16px"} className="text-bold  ">
                    {" "}
                    update
                  </Typography>{" "}
                </StyledButton>
                // </NavLink>
              )}
              {showDeleteButton && (
                <StyledButton
                  className="   submerged max-h-16 "
                  onClick={() => dispatch(openDeleteModal())}
                >
                  <i className="submerged_button w-8 h-8">
                    <div className=" text-red-600 w-6 h-6 ">
                      <myIcons.TrashIcon />
                    </div>
                  </i>
                  <Typography
                    fontSize={"16px"}
                    className="text-bold  text-red-600 "
                  >
                    {" "}
                    delete
                  </Typography>{" "}
                </StyledButton>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
