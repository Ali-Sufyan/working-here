/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper, Typography } from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCheckIfEmailExistsMutation } from "../../../../../app/services/auth/auth.query";
import { useCreateStaffMutation } from "../../../../../app/services/staff/staff.query";
import {
  deleteFormKeys,
  setKeyValue,
} from "../../../../../app/slices/forms/forms.type";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../app/slices/hooks";
import { useGetRolesHook } from "../../../../../hooks/prefetch.roles";
import { colorScheme } from "../../../../utilities/color-scheme";
import { deleteEmptyKeysAndValues } from "../../../../utilities/delete-empty-kv";
import { regexCheckFormFields } from "../../../../utilities/forms/hooks/check-fields-with-regex";
import { handleFormChange } from "../../../../utilities/forms/hooks/handle-change";
import { validateFormKeys } from "../../../../utilities/forms/hooks/validateFields";
import { Input } from "../../../../utilities/forms/input";
import { InputI } from "../../../../utilities/forms/input.interface";
import { SelectInput } from "../../../../utilities/forms/select";
import { myIcons } from "../../../../utilities/icons";
import StyledButton from "../../../../utilities/styles/buton";
import Loading from "../../../../utilities/styles/loading";
import StyledToggle from "../../../../utilities/styles/toggle";
import { emailRegex } from "../../../../utilities/validators";

export const CreateStaff = () => {
  const [call, setCall] = useState(true);

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
    
    notes: `${formName}-notes`,
    phoneNumber: `${formName}-phone-number`,
    role: `${formName}-role`,
    branchId:`${formName}-branch`
  };

  const selector = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const [staff, { isLoading, isError, isSuccess, error }] =
    useCreateStaffMutation();
  const [checkAuth, setCheckAuth] = useState<boolean>(false);
  useEffect(() => {
    if (isError)
      toast.error(
        error.message
          ? `${error.message}`
          : "error occurred while creating staff "
      );
    if (isSuccess) toast.success("successfully created");
  }, [isError, isSuccess, error]);



  const [
    emailChecker,
    {
      isLoading: isEmailLoading,

      isSuccess: isEmailSuccess,

      data: emailData,
    },
  ] = useCheckIfEmailExistsMutation();

useEffect (()=>{

     if(emailData){
            dispatch(setKeyValue({
              [fields.firstName]: {
                isValid: true,
                value:emailData.firstName
               
              },
              [fields.lastName]: {
                isValid: true,
                value:emailData.lastName
              },
              [fields.email]: {
                isValid: true,
                value:emailData.email
              },
            }))
          }
},
[emailData]
)
  const { isRolesLoading, isRolesSuccess, rolesState } = useGetRolesHook();
  // const {
  //   data: RolesData,
  //   isLoading: isRolesLoading,
  //   isSuccess: isRolesSuccess,
  // } = useGetRolesQuery();

  // // //console.log(selector);
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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
        required: true,
        value: selector[fields.firstName]?.value,
        placeholder: "first name",

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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
        required: true,

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
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
        required: true,
        value: selector[fields.email]?.value,

        placeholder: "example@gmail.com",
        classN: "w-[100%]",
        label: "text",
        onChange: (e: any) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
            check: {
              regex: emailRegex,
            },
          });
          checkEmail(e);
        },
      },
      prefix: {
        element: (
          <div className="w-6 h-6 text-[var(--dark-2)]">
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
      extraInfo: selector[fields.email]?.isValid
        ? isEmailLoading
          ? "checking availability"
          : isEmailSuccess
          ? emailData
            ? "email has already registered an account"
            : "email is available"
          : ""
        : "",
      extraInfoIcon: isEmailLoading ? (
        <DotSpinner color={colorScheme.primary} size={20} />
      ) : (
        <></>
      ),
      showExtraInfo: isEmailLoading || isEmailSuccess ? true : false,
    },
  ];
  // const;
  async function checkEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (
      e.currentTarget.value &&
      emailRegex.test(e?.currentTarget.value) &&
      selector[fields.email]?.isValid
    ) {
      const data = {
        email: e.currentTarget.value,
      };
      if (data.email) {
        const d = setTimeout(async () => {
    await emailChecker({
            email: String(data.email),
    });
       
          
        }, 2000);
        return () => {
          clearTimeout(d);
        };
      }
    }
  }
  async function submit() {
    const obj: Record<string, any> = {};
    Object.entries(fields).map(([key, value]) => {
      if (selector[value] && selector[value]?.value !== undefined) {
        obj[key] = selector[value]?.value;
      }
    });
    const pos = obj.position;
    const posi = Object.keys(rolesState).find((key) => rolesState[key] === pos);
    obj.role = obj.position;
    obj.position = posi;
    obj.isAuthenticated = checkAuth;

    const deleteEmptyKV = deleteEmptyKeysAndValues(obj);
    const val = validateFormKeys(
      {
        [fields.firstName]: selector[fields.firstName],
        [fields.lastName]: selector[fields.lastName],
        [fields.email]: selector[fields.email],
       
        [fields.position]: selector[fields.position],
      },
      dispatch
    );
    if (val && call) {
      if (
        deleteEmptyKV &&
        deleteEmptyKV.firstName &&
        deleteEmptyKV.lastName &&
        deleteEmptyKV.email
      ) {
        await staff(deleteEmptyKV);

        if (isSuccess) {
          dispatch(deleteFormKeys(Object.values(fields)));
        }
      }
      setCall(false);
      const setT = setTimeout(() => {
        setCall(true);
      }, 3000);
      return () => {
        clearTimeout(setT);
      };
    }
  }
  return (
    <div>
      <Grid container>
        <Grid item xs md sm xl lg></Grid>

        <Grid xs={12} sm={12} lg={7} md={10} xl={7}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              placeItems: "normal",
              borderTop: 4,
              borderColor: colorScheme.primary,
              pb: 0,

              px: 0,
              m: 0,
            }}
          >
            <div className="bg-[var(--gray-1)] p-4 shadow-md flex flex-row align-middle justify-start items-center sm:pl-[32px] md:pl-[48px] xl:pl-[64px] text-[var(--dark-1)] lg:pl-[64px] mb-5">
           
                <UserPlus />
           
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
                Create Staff
              </Typography>
            </div>
            <div className="p-4 "></div>
            <Grid item className="flex flex-row align-middle items-center">
              {" "}
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  placeItems: "center",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
                className="px-4 text-[var(--primary-dark)]"
              >
                Authorize
              </Typography>{" "}
              <div className="">
                <StyledToggle
                  checked={checkAuth}
                  onClick={() => setCheckAuth(!checkAuth)}
                />
              </div>
            </Grid>
            <div className="p-2 "></div>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "start",
                placeItems: "center",
                fontWeight: "600",
                fontSize: "16px",
              }}
              className="px-4 text-[var(--primary-dark)]"
            >
              Basic Info
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              gap={2}
              sx={{
                m: 0,
              }}
            >
              {userData.map((input) => {
                return (
                  <Grid item xs={5}>
                    <Input
                      props={{
                        inputType: input.inputType,
                        err: input.err,
                        helper: input.helper,
                        label: input.label,
                        prefix: input.prefix,
                        showHelper: input.showHelper,
                        suffix: input.suffix,
                        extraInfo: input.extraInfo,
                        extraInfoIcon: input.extraInfoIcon,
                        showExtraInfo: input.showExtraInfo,
                      }}
                    />
                  </Grid>
                );
              })}{" "}
           
            </Grid>{" "}
            <div className="p-2"></div>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "start",
                placeItems: "center",
                fontWeight: "600",
                fontSize: "16px",
              }}
              className="px-4 text-[var(--primary-dark)]"
            >
              Work Info
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              gap={2}
              sx={{
                m: 0,
              }}
            >
              {workData.map((input) => {
                return (
                  <Grid item xs={5}>
                    <Input
                      props={{
                        inputType: input.inputType,
                        err: input.err,
                        helper: input.helper,
                        label: input.label,
                        prefix: input.prefix,
                        showHelper: input.showHelper,
                        suffix: input.suffix,
                        extraInfo: input.extraInfo,
                        extraInfoIcon: input.extraInfoIcon,
                        showExtraInfo: input.showExtraInfo,
                      }}
                    />
                  </Grid>
                );
              })}{" "}
              <Grid item xs={5}>
                <SelectInput
                  props={{
                    prefix: {
                      element: (
                        <div className="w-6 h-6 text-[var(--dark-2)]">
                          {" "}
                          {isRolesLoading ? (
                            <Loading transparent size={10} />
                          ) : (
                            <myIcons.BriefcaseIcon />
                          )}
                        </div>
                      ),
                    },
                    label: "position",
                    placeholder: "select a position",
                    err: !selector[fields.position]?.isValid,
                    helper: selector[fields.position]?.isValid
                      ? selector[fields.position]?.validMessage
                      : selector[fields.position]?.errorMessage,
                    showHelper: selector[fields.position]?.showMessage,
                    inputType: {
                      name: fields.position,
                      required: true,

                      value: selector[fields.position]?.value,
                      className: "",

                      onChange: (e: any) => {
                        handleFormChange({ event: e, dispatch });
                        regexCheckFormFields({
                          event: e,
                          dispatch,
                          selector,
                        });
                      },
                    },
                    kv: isRolesSuccess && rolesState ? rolesState : {},
                  }}
                />
              </Grid>
          
            </Grid>
            <div className="p-2 "></div>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "start",
                placeItems: "center",
                fontWeight: "600",
                fontSize: "16px",
              }}
              className="px-8 text-[var(--primary-dark)]"
            >
              Bio Data
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              gap={2}
              sx={{
                m: 0,
              }}
            >
              {bioData.map((input) => {
                return (
                  <Grid item xs={5}>
                    <Input
                      props={{
                        inputType: input.inputType,
                        err: input.err,
                        helper: input.helper,
                        label: input.label,
                        prefix: input.prefix,
                        showHelper: input.showHelper,
                        suffix: input.suffix,
                        extraInfo: input.extraInfo,
                        extraInfoIcon: input.extraInfoIcon,
                        showExtraInfo: input.showExtraInfo,
                      }}
                    />
                  </Grid>
                );
              })}{" "}
            </Grid>
            <div className="mb-2"></div>
            <div className=" flex flex-col justify-items-end place-items-end align-middle p-2 mr-4">
              <div className=""></div>

              <StyledButton
                className="  bg-primary elevated  max-h-16 px-1"
                onClick={submit}
              >
                <Typography
                  fontSize={"16px "}
                  className="text-bold text-white px-[2px]  "
                >
                  {" "}
                  submit
                </Typography>{" "}
                {isLoading ? (
                  <div className=" px-2 ">
                    <Loading transparent color="white" size={20} />
                  </div>
                ) : (
                  <i className="submerged_button w-8 h-8">
                    <div className=" text-black w-6 h-6 ">
                      <myIcons.IconCircuitChangeover />
                    </div>
                  </i>
                )}
              </StyledButton>
            </div>
            <div className="mb-10"></div>
          </Paper>
        </Grid>

        <Grid item xs sm md xl lg></Grid>
      </Grid>
    </div>
  );
};

