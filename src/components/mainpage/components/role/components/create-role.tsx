/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { allPermissions } from "../../../../../app/permissions";
import { useGetPermissionsQuery } from "../../../../../app/services/roles/permission";
import { useCreateRoleMutation } from "../../../../../app/services/roles/roles";
import { deleteFormKeys } from "../../../../../app/slices/forms/forms.type";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../app/slices/hooks";
import { colorScheme } from "../../../../utilities/color-scheme";
import { handleFormChange } from "../../../../utilities/forms/hooks/handle-change";
import { validateFormKeys } from "../../../../utilities/forms/hooks/validateFields";
import { Input } from "../../../../utilities/forms/input";
import { myIcons } from "../../../../utilities/icons";
import StyledButton from "../../../../utilities/styles/buton";
import { Divider } from "../../../../utilities/styles/divider";
import Loading from "../../../../utilities/styles/loading";
import { capitalize, splitByUppercase } from "../../../../utilities/utils";

export function CreateRoles() {
  const { data, isLoading, isSuccess } = useGetPermissionsQuery();
  const [
    role,
    {
      isLoading: isRoleLoading,
      isSuccess: isRoleSuccess,
      isError: isRoleError,
      error: roleError,
    },
  ] = useCreateRoleMutation();
  const selector = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formName = "create-role-form";
  const name = `${formName}-name`;
  const details = `${formName}-details`;
  useEffect(() => {
    if (isRoleSuccess) {
      toast.success("Role created successfully");

      navigate("/role");
    }

    if (isRoleError) {
      toast.error(roleError.message ?? "Error creating role");
    }
  }, [isRoleSuccess, isRoleError, navigate, roleError]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "usersOnly",
    
    "userOnly",
  ]);

  const handleCheckboxChange = (permissionId: string) => {
    // Toggle the selection state of the permissionId
    setSelectedPermissions((prevSelected) => {
      if (prevSelected.includes(permissionId)) {
        return prevSelected.filter((id) => id !== permissionId);
      } else {
        return [...prevSelected, permissionId];
      }
    });
    // dispatch(setKeyValue({ [permissions]: { value: selectedPermissions } }));
  };

  function filterPermissions(permission?: string) {
    if (isSuccess) {
      const uniqueDetails = new Set<string>();
  

      return data?.filter((item) => {
        // Check if the details value is unique
        if (!uniqueDetails.has(item.name)) {
          uniqueDetails.add(item.name);
          return !permission || item.name.toLowerCase().includes(permission);
        }
        return false;
      });
    }
  }
  const selectAll = (checkAll: boolean) => {
    // Loop through all permissions and update the state
    if (isSuccess) {
      const allPermissionIds =
        filterPermissions()?.map((item) => item.name) || [];
      setSelectedPermissions(checkAll ? allPermissionIds : []);
    }
    // dispatch(setKeyValue({ [permissions]: { value: selectedPermissions } }));
  };

  async function submit() {
    try {
      const val = validateFormKeys(
        { [name]: selector[name], [details]: selector[details] },
        dispatch
      );
      if (selectedPermissions.length < 1) {
        toast.error("Please select at least one permission");
      }
      if (val && selectedPermissions.length >= 1) {
        const g = await role({
          details: selector[details]?.value,
          name: selector[name]?.value,
          permissions: selectedPermissions,
        });
        if (g) {
          dispatch(deleteFormKeys([name, details]));
        }
      }
    } catch (e: any) {
      //console.log(e);

      toast.error(` error occurred creating role: ${e.message ?? ""}`);
    }
  }
  return (
    <div>
      <Grid container>
        <Grid item xs md sm xl lg></Grid>

        <Grid xs={12} sm={12} lg={8} md={12} xl={8}>
          <Paper
            elevation={7}
            sx={{
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              placeItems: "normal",
              borderTop: 10,
              background: colorScheme.gray_0,
              borderColor: colorScheme.primary,
              pb: 0,

              px: 0,
              mb: 10,
            }}
          >
            {" "}
            <div className="bg-[var(--gray-2)] p-4 shadow-md flex flex-row align-middle justify-start items-center sm:pl-[32px] md:pl-[48px] xl:pl-[64px] text-[var(--dark-1)] lg:pl-[64px] mb-5">
              <div className="h-7 w-7">
                <myIcons.IconPersonWorkspace />
              </div>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  placeItems: "center",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
                className="px-3"
              >
                Create Role
              </Typography>
            </div>
            <div className="pl-8 pr-2 py-10">
              <Input
                props={{
                  inputType: {
                    type: "text",
                    value: selector[name]?.value,
                    required: true,

                    placeholder: "name",
                    name: name,
                    classN: "w-[100%]",
                    label: "text",
                    onChange: (e) => {
                      handleFormChange({ event: e, dispatch });
                    },
                  },
                  label: "name",
                  err: !selector[name]?.isValid,
                  helper: selector[name]?.isValid
                    ? selector[name]?.validMessage
                    : selector[name]?.errorMessage,
                  showHelper: selector[name]?.showMessage,
                  prefix: {
                    element: (
                      <div className="w-6 h-6 text-[var(--dark-2)]">
                        {" "}
                        <myIcons.InformationIcon />
                      </div>
                    ),
                  },
                }}
              />{" "}
              <Input
                props={{
                  inputType: {
                    type: "text",
                    value: selector[details]?.value,
                    required: true,

                    placeholder: "details",
                    name: details,
                    classN: "w-[100%]",
                    label: "text",
                    onChange: (e) => {
                      handleFormChange({ event: e, dispatch });
                    },
                  },
                  label: "details",
                  err: !selector[details]?.isValid,
                  helper: selector[details]?.isValid
                    ? selector[details]?.validMessage
                    : selector[details]?.errorMessage,
                  showHelper: selector[details]?.showMessage,
                  prefix: {
                    element: (
                      <div className="w-6 h-6 text-[var(--dark-2)]">
                        {" "}
                        <myIcons.InformationIcon />
                      </div>
                    ),
                  },
                }}
              />
            </div>
            {isLoading ? (
              <Loading transparent size={80} />
            ) : (
              <div className="">
                <div className="text-[16px] px-8 font-semibold">
                  {capitalize({ text: "permissions" })}
                </div>{" "}
                <div className="py-5 pr-[100px] font-semibold">
                  <Input
                    props={{
                      inputType: {
                        type: "checkbox",
                        onChange: (e) => selectAll(e.target.checked),
                      },
                      label: capitalize({ text: "select all" }),
                    }}
                  />
                </div>
                {Object.keys(allPermissions).map((e) => {
            
                  return (
                    <>
                      <Divider content="" className="" />
                      <div className="text-[16px] px-8  font-medium">
                        {capitalize({ text: splitByUppercase(e).join(" ") })}
                      </div>
                      {isLoading ? (
                        <>
                          <Loading transparent size={80} />
                        </>
                      ) : (
                        isSuccess && (
                          <Grid container>
                            {filterPermissions(e.toLowerCase())?.map((d) => (
                              <Grid xs={12} sm={12} lg={6} md={12} xl={6}>
                                <div className="py-5 text-[14px]  font-semibold ">
                                  <Input
                                    props={{
                                      inputType: {
                                        type: "checkbox",
                                        onChange: () =>
                                          handleCheckboxChange(d.name),
                                        checked: selectedPermissions.includes(
                                          d.name
                                        ),
                                      },
                                      label: d.details,
                                    }}
                                  />
                                </div>{" "}
                              </Grid>
                            ))}
                          </Grid>
                        )
                      )}
                    </>
                  );
                })}
              </div>
            )}{" "}
            <div className="my-2"></div>
            <div className="flex flex-col justify-items-end pr-2 pb-2 place-items-end align-middle">
              <StyledButton
                className="bg-primary  elevated  max-h-16 px-1"
                onClick={() => {
                  submit();
                  if (isRoleSuccess) {
                    toast.success("Role created successfully");
                    dispatch(deleteFormKeys([name, details]));
                  }
                }}
              >
                {isRoleLoading ? (
             
                    <Loading transparent color="white" size={20} />
                
                ):
                <i className="submerged_button w-8 h-8">
                  <div className=" text-white w-6 h-6 ">
                    <myIcons.PlusIcon />
                  </div>
                </i>}
                <Typography fontSize={"16px"} className="text-bold text-white ">
                  {" "}
                  submit
                </Typography>{" "}
              </StyledButton>
            </div>
          </Paper>
        </Grid>
        <Grid item xs md sm xl lg></Grid>
      </Grid>
    </div>
  );
}
