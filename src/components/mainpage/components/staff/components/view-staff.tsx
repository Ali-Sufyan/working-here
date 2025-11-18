/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper, Typography } from "@mui/material";
import { Monitor } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { NavLink, useParams } from "react-router-dom";
import {
  useDeleteStaffMutation,
  useGetStaffByIdQuery,
} from "../../../../../app/services/staff/staff.query";
import { StaffResponseI } from "../../../../../app/services/staff/staff.types";
import { FormsReducerI } from "../../../../../app/slices/forms/forms.interface";
import { setKeyValue } from "../../../../../app/slices/forms/forms.type";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../app/slices/hooks";
import {
  closeDeleteModal,
  openDeleteModal,
} from "../../../../../app/slices/modal/modal.types";
import { setClickCount } from "../../../../../app/slices/tableDataActions/table-data-actions.types";
import { useGetRolesHook } from "../../../../../hooks/prefetch.roles";
import { isMyProperty } from "../../../../utilities/checkkey-in-object";
import DeleteModal from "../../../../utilities/crud/delete";
import { regexCheckFormFields } from "../../../../utilities/forms/hooks/check-fields-with-regex";
import { handleFormChange } from "../../../../utilities/forms/hooks/handle-change";
import { InputI } from "../../../../utilities/forms/input.interface";
import { myIcons } from "../../../../utilities/icons";
import CustomModal from "../../../../utilities/modal/modal";
import StyledButton from "../../../../utilities/styles/buton";
import Loading from "../../../../utilities/styles/loading";
import StyledToggle from "../../../../utilities/styles/toggle";
import { capitalize } from "../../../../utilities/utils";

export function FetchStaffForView() {
  const { staffId } = useParams<{ staffId: string }>();

  const {
    data: staffData,
    isLoading,
    isFetching,
  } = useGetStaffByIdQuery(staffId!);

  return staffData ? (
    <ViewStaff staffDetails={staffData} />
  ) : isFetching || isLoading ? (
    <Loading fullscreen transparent />
  ) : (
    <></>
  );
}

export const ViewStaff = ({
  staffDetails,
}: {
  staffDetails: StaffResponseI;
}) => {
  const formName = "create-staff-form";
  const fields: Record<string, string> = {
    address: `${formName}-address`,
    benefits: `${formName}-benefits`,
    dateOfBirth: `${formName}-date-of-birth`,
    firstName: `${formName}-first-name`,
    lastName: `${formName}-last-name`,
    position: `${formName}-position`,
    isAuthenticated: `${formName}-is-authenticated`,
    isActive: `${formName}-is-active`,
    salary: `${formName}-salary`,
    hireDate: `${formName}-hire-date`,
    department: `${formName}-department`,
    email: `${formName}-email`,
    emergencyContactName: `${formName}-emergency-contact-name`,
    emergencyContactPhone: `${formName}-emergency-contact-phone`,
    lastActiveTime: `${formName}-last-active-time`,
    password: `${formName}-password`,
    notes: `${formName}-notes`,
    phoneNumber: `${formName}-phone-number`,
    role: `${formName}-role`,
  };

  const selector = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const tableData = useAppSelector((state) => state.tableData);

  // const [checkAuth, _setCheckAuth] = useState<boolean>(
  //   Boolean(staffDetails.isAuthenticated)
  // );
  //   const { roleState, isSuccess: roleIsSuccess } = useGetRoleByCrypt(
  //     staffDetails.userId.role
  //   );
  const { isRolesSuccess, rolesState } = useGetRolesHook();
  const [
    del,
    {
      isSuccess: isStaffDeleteSuccess,
      isLoading: isStaffDeleteLoading,
      isError: isStaffDeleteError,
    },
  ] = useDeleteStaffMutation();

  useEffect(() => {
    const value: FormsReducerI = {};
    Object.entries(fields).map(([k, v]) => {
      const userId = staffDetails.userId;
      if (k === "email" || k === "firstName" || k === "lastName") {
        value[v] = {
          value: userId[k] as any,
          isValid: true,
          errorMessage: "",
          validMessage: "",
        };
      } else if (k === "hireDate" || k === "dateOfBirth") {
        const date = staffDetails[k] && String(staffDetails[k]).slice(0, 10);
        value[v] = {
          value: date,
          isValid: true,
          errorMessage: "",
          validMessage: "",
        };
      } else if (k === "role" || k === "position") {
        console.log(
          rolesState,
          "roles state",
          rolesState[staffDetails.position]
        );
        if (isRolesSuccess)
          value[v] = {
            value: rolesState[staffDetails.position],
            isValid: true,
            errorMessage: "",
            validMessage: "",
          };
      } else {
        if (isMyProperty<StaffResponseI>(k, staffDetails))
          value[v] = {
            value: staffDetails[k] as any,
            isValid: true,
            errorMessage: "",
            validMessage: "",
          };
      }
    });
    dispatch(setKeyValue(value));
  }, [dispatch, rolesState, isRolesSuccess]);

  // const {
  //   data: RolesData,
  //   isLoading: isRolesLoading,
  //   isSuccess: isRolesSuccess,
  // } = useGetRolesQuery();

  // // console.log(selector);
  // useEffect(() => {
  //   if (isRolesSuccess && RolesData) {
  //     setRolesData(RolesData);
  //   }
  //   if (isRolesSuccess && rolesData.length > 0) {
  //     const roles: Record<string, any> = {};
  //     rolesData.map((role) => {
  //       roles[role.name] = role.id;
  //       setRolesState(roles);
  //     });
  //   }
  // }, []);

  const workData: InputI[] = [
    {
      inputType: {
        type: "text",
        name: fields.department,

        value: selector[fields.department]?.value,
        placeholder: "department",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.BriefcaseIcon />
          </div>
        ),
      },
      label: "Department",
      err: !selector[fields.department]?.isValid,
      helper: selector[fields.department]?.isValid
        ? selector[fields.department]?.validMessage
        : selector[fields.department]?.errorMessage,
      showHelper: selector[fields.department]?.showMessage,
    },
    {
      inputType: {
        type: "date",
        name: fields.hireDate,

        value: selector[fields.hireDate]?.value,
        placeholder: "hire date",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.CalendarIcon />
          </div>
        ),
      },
      label: "Hire Date",
      err: !selector[fields.hireDate]?.isValid,
      helper: selector[fields.hireDate]?.isValid
        ? selector[fields.hireDate]?.validMessage
        : selector[fields.hireDate]?.errorMessage,
      showHelper: selector[fields.hireDate]?.showMessage,
    },
    {
      inputType: {
        type: "number",
        name: fields.salary,

        value: selector[fields.salary]?.value,
        placeholder: "salary",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.BriefcaseIcon />
          </div>
        ),
      },
      label: "salary",
      err: !selector[fields.salary]?.isValid,
      helper: selector[fields.salary]?.isValid
        ? selector[fields.salary]?.validMessage
        : selector[fields.salary]?.errorMessage,
      showHelper: selector[fields.salary]?.showMessage,
    },
    {
      inputType: {
        type: "text",
        name: fields.position,

        value: Object.keys(rolesState).find(
          (d) => rolesState[d] === selector[fields.position]?.value
        ),
        placeholder: "salary",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.BriefcaseIcon />
          </div>
        ),
      },
      label: "position",
      err: !selector[fields.salary]?.isValid,
      helper: selector[fields.salary]?.isValid
        ? selector[fields.salary]?.validMessage
        : selector[fields.salary]?.errorMessage,
      showHelper: selector[fields.salary]?.showMessage,
    },
  ];

  const bioData: InputI[] = [
    {
      inputType: {
        type: "text",
        name: fields.phoneNumber,

        value: selector[fields.phoneNumber]?.value,
        placeholder: "phoneNumber",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.UserBold />
          </div>
        ),
      },
      label: "Phone Number",
      err: !selector[fields.phoneNumber]?.isValid,
      helper: selector[fields.phoneNumber]?.isValid
        ? selector[fields.phoneNumber]?.validMessage
        : selector[fields.phoneNumber]?.errorMessage,
      showHelper: selector[fields.phoneNumber]?.showMessage,
    },
    {
      inputType: {
        type: "text",
        name: fields.address,

        value: selector[fields.address]?.value,
        placeholder: "address",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.UserBold />
          </div>
        ),
      },
      label: "Address",
      err: !selector[fields.address]?.isValid,
      helper: selector[fields.address]?.isValid
        ? selector[fields.address]?.validMessage
        : selector[fields.address]?.errorMessage,
      showHelper: selector[fields.address]?.showMessage,
    },
    {
      inputType: {
        type: "date",
        name: fields.dateOfBirth,

        value: selector[fields.dateOfBirth]?.value,
        placeholder: "date Of Birth",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.CalendarIcon />
          </div>
        ),
      },

      label: "Date Of Birth",
      err: !selector[fields.dateOfBirth]?.isValid,
      helper: selector[fields.dateOfBirth]?.isValid
        ? selector[fields.dateOfBirth]?.validMessage
        : selector[fields.dateOfBirth]?.errorMessage,
      showHelper: selector[fields.dateOfBirth]?.showMessage,
    },
    {
      inputType: {
        type: "text",
        name: fields.emergencyContactName,

        value: selector[fields.emergencyContactName]?.value,
        placeholder: "emergencyContactName",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.UserBold />
          </div>
        ),
      },
      label: "Next of Kin",
      err: !selector[fields.emergencyContactName]?.isValid,
      helper: selector[fields.emergencyContactName]?.isValid
        ? selector[fields.emergencyContactName]?.validMessage
        : selector[fields.emergencyContactName]?.errorMessage,
      showHelper: selector[fields.emergencyContactName]?.showMessage,
    },
    {
      inputType: {
        type: "text",
        name: fields.emergencyContactPhone,

        value: selector[fields.emergencyContactPhone]?.value,
        placeholder: "emergencyContactPhone",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.UserBold />
          </div>
        ),
      },
      label: "Next Of Kin Number",
      err: !selector[fields.emergencyContactPhone]?.isValid,
      helper: selector[fields.emergencyContactPhone]?.isValid
        ? selector[fields.emergencyContactPhone]?.validMessage
        : selector[fields.emergencyContactPhone]?.errorMessage,
      showHelper: selector[fields.emergencyContactPhone]?.showMessage,
    },
    {
      inputType: {
        type: "text",
        name: fields.notes,

        value: selector[fields.notes]?.value,
        placeholder: "notes",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.UserBold />
          </div>
        ),
      },
      label: "Notes",
      err: !selector[fields.notes]?.isValid,
      helper: selector[fields.notes]?.isValid
        ? selector[fields.notes]?.validMessage
        : selector[fields.notes]?.errorMessage,
      showHelper: selector[fields.notes]?.showMessage,
    },
  ];

  const userData: InputI[] = [
    {
      inputType: {
        type: "text",
        name: fields.firstName,

        value: selector[fields.firstName]?.value,
        placeholder: "first name",

        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
        },
      },

      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.UserBold />
          </div>
        ),
      },
      label: "First Name",
      err: !selector[fields.firstName]?.isValid,
      helper: selector[fields.firstName]?.isValid
        ? selector[fields.firstName]?.validMessage
        : selector[fields.firstName]?.errorMessage,
      showHelper: selector[fields.firstName]?.showMessage,
    },
    {
      inputType: {
        type: "text",
        placeholder: "last name",
        value: selector[fields.lastName]?.value,

        name: fields.lastName,
        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },
      err: !selector[fields.lastName]?.isValid,
      helper: selector[fields.lastName]?.isValid
        ? selector[fields.lastName]?.validMessage
        : selector[fields.lastName]?.errorMessage,
      showHelper: selector[fields.lastName]?.showMessage,
      prefix: {
        element: (
          <div className="w-6 h-6 text-gray-500">
            {" "}
            <myIcons.UserBold />
          </div>
        ),
      },
      label: "Last Name",
    },
    {
      inputType: {
        type: "email",
        name: fields.email,

        value: selector[fields.email]?.value,

        placeholder: "example@gmail.com",
        classN: "w-[100%]",
        label: "text",
      },
      prefix: {
        element: (
          <div className="w-3 h-3 text-gray-500">
            {" "}
            <myIcons.MessageIconBold />
          </div>
        ),
      },
      label: "Email",
      err: !selector[fields.email]?.isValid,
      helper: selector[fields.email]?.isValid
        ? selector[fields.email]?.validMessage
        : selector[fields.email]?.errorMessage,
      showHelper: selector[fields.email]?.showMessage,
    },
  ];
  // const;

  const handleDelete = async (id: string) => {
    // console.log("hello world handle click", variableFromTable, "and", crud);
    // console.log("hello world handle delete", tableData, "and", crud);

    try {
      if (tableData.click === 0) {
        const f = await del(id);

        if (f) {
          dispatch(setClickCount(1)); // Assuming this is used for disabling the button

          if (isStaffDeleteSuccess) {
            dispatch(closeDeleteModal());
          }
        }
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error(`${error}`);
    }
  };
 const renderInfoSection = (title: string, data: any) => (
   <Grid container spacing={2} sx={{ px: 3,  }}
   className='m-2'
   >
     <Typography
       variant="subtitle1"
       fontWeight={600}
       sx={{ color: "var(--primary-dark)", mb: 1 }}
       className="text-primary-dark"
     >
       {title}
     </Typography>
     {data.map((input: any, index: number) => (
       <Grid item xs={12} sm={12} key={index} className='flex flex-col align-middle flex-start'>
         <Typography variant="body2" fontWeight={500}>
           {capitalize({ text: String(input.inputType.value) })}
         </Typography>
<div className="flex flex-row ">
           {input.prefix?.element}
           <Typography variant="body2" sx={{ color: "" }} className="">
             {input.label}
           </Typography>
</div>
       </Grid>
     ))}
   </Grid>
 );
  return (
    <div>
      <CustomModal>
        <DeleteModal
          props={{
            id: staffDetails.id,
            confirm: handleDelete,
            metadata: [`${staffDetails.firstName} ${staffDetails.lastName}`],
            isLoading: isStaffDeleteLoading ?? false,
          }}
        />
      </CustomModal>

      {isStaffDeleteSuccess && toast.success("Staff deleted successfully")}
      {isStaffDeleteError && toast.error("Error occurred")}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            elevation={7}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "var(--gray-2)",
            }}
          >
            {/* Header Section */}
            <div className="p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center">
                <Monitor className='text-primary-dark'/>
                <Typography variant="h6" fontWeight={600} sx={{ ml: 2 }}>
                  View Staff
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ color: "var(--primary-dark)" }}
                >
                  Authorized
                </Typography>
                <StyledToggle checked={Boolean(staffDetails.isAuthenticated)} />
              </div>
            </div>

            {/* Content Sections */}
            <Grid container spacing={4}>
  {/* Render sections in a row for larger screens, stacked for smaller screens */}
  <Grid item xs={12} md={4}>
    {renderInfoSection("Basic Info", userData)}
  </Grid>
  <Grid item xs={12} md={4}>
    {renderInfoSection("Work Info", workData)}
  </Grid>
  <Grid item xs={12} md={4}>
    {renderInfoSection("Bio Data", bioData)}
  </Grid>
</Grid>

            {/* Action Buttons */}
            <div className="p-4 flex justify-end gap-2">
              <NavLink to={`/staff/${staffDetails.id}/edit`}>
                <StyledButton  color="primary">
                  <myIcons.IconCircuitChangeover  />
                  Update
                </StyledButton>
              </NavLink>
              <StyledButton
               
                color="error"
                onClick={() => dispatch(openDeleteModal())}
              >
                <myIcons.TrashIcon/>
                Delete
              </StyledButton>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
