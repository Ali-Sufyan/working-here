import { Grid, Paper, Typography } from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import clsx from "clsx";
import React, { useState } from "react";
import { useCheckIfEmailExistsMutation } from "../../../../../app/services/auth/auth.query";
import { useAddUserMutation } from "../../../../../app/services/users/user.query";
import {
    deleteFormKeys,
    setKeyValue,
} from "../../../../../app/slices/forms/forms.type";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../../app/slices/hooks";
import { colorScheme } from "../../../../utilities/color-scheme";
import { regexCheckFormFields } from "../../../../utilities/forms/hooks/check-fields-with-regex";
import { handleFormChange } from "../../../../utilities/forms/hooks/handle-change";
import { validateFormKeys } from "../../../../utilities/forms/hooks/validateFields";
import { Input } from "../../../../utilities/forms/input";
import { InputI } from "../../../../utilities/forms/input.interface";
import { myIcons } from "../../../../utilities/icons";
import { Eye, EyeSlash } from "../../../../utilities/icons/util-icons";
import {
    GeneratekeyE,
    generateAlphanumericReference,
} from "../../../../utilities/referenceGenerator";
import StyledButton from "../../../../utilities/styles/buton";
import Loading from "../../../../utilities/styles/loading";
import { emailRegex, passwordRegex } from "../../../../utilities/validators";

export function CreateUser() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [call, setCall] = useState(true);

  const formName = "create-user-form";
  const email = `${formName}-email`;
  const password = `${formName}-password`;
  const firstName = `${formName}-first-name`;
  const lastName = `${formName}-last-name`;

  const selector = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const [user, { isLoading, isError, isSuccess, error }] = useAddUserMutation();

  const [
    emailChecker,
    {
      isLoading: isEmailLoading,

      isSuccess: isEmailSuccess,

      data: emailData,
    },
  ] = useCheckIfEmailExistsMutation();
  // //console.log(selector);
  const userData: InputI[] = [
    {
      inputType: {
        type: "text",
        name: firstName,
        required: true,
        value: selector[firstName]?.value,
        placeholder: "first name",

        classN: "w-[100%]",
        label: "text",
        onChange: (e) => {
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
      err: !selector[firstName]?.isValid,
      helper: selector[firstName]?.isValid
        ? selector[firstName]?.validMessage
        : selector[firstName]?.errorMessage,
      showHelper: selector[firstName]?.showMessage,
    },
    {
      inputType: {
        type: "text",
        placeholder: "last name",
        value: selector[lastName]?.value,
        required: true,

        name: lastName,
        classN: "w-[100%]",
        label: "text",
        onChange: (e) => {
          handleFormChange({ event: e, dispatch });
          regexCheckFormFields({
            event: e,
            dispatch,
            selector,
          });
        },
      },
      err: !selector[lastName]?.isValid,
      helper: selector[lastName]?.isValid
        ? selector[lastName]?.validMessage
        : selector[lastName]?.errorMessage,
      showHelper: selector[lastName]?.showMessage,
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
        name: email,
        required: true,
        value: selector[email]?.value,

        placeholder: "example@gmail.com",
        classN: "w-[100%]",
        label: "text",
        onChange: (e) => {
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
      err: !selector[email]?.isValid,
      helper: selector[email]?.isValid
        ? selector[email]?.validMessage
        : selector[email]?.errorMessage,
      showHelper: selector[email]?.showMessage,
      extraInfo: selector[email]?.isValid
        ? isEmailLoading
          ? "checking availability"
          : isEmailSuccess
          ? emailData!.valueOf()
            ? "email has been taken"
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
      selector[email]?.isValid
    ) {
      //console.log(selector[email].value);
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
    const val = validateFormKeys(
      {
        [firstName]: selector[firstName],
        [lastName]: selector[lastName],
        [email]: selector[email],
        [password]: selector[password],
      },
      dispatch
    );
    if (val && call) {
      const data = {
        firstName: selector[firstName].value,
        lastName: selector[lastName].value,
        email: selector[email].value,
        password: selector[password].value,
      };
      if (data.firstName && data.lastName && data.email && data.password) {
        await user({
          email: String(data.email),
          firstName: String(data.firstName),
          lastName: String(data.lastName),
          password: String(data.password),
        });

        if (isSuccess) {
          dispatch(deleteFormKeys([email, password, firstName, lastName]));
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

        <Grid xs={12} sm={12} lg={5} md={12} xl={5}>
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
              borderColor: colorScheme.primary,
              pb: 0,

              px: 0,
              m: 0,
            }}
          >
            <div className="bg-[var(--gray-2)] p-4 shadow-md flex flex-row align-middle justify-start items-center sm:pl-[32px] md:pl-[48px] xl:pl-[64px] text-[var(--dark-1)] lg:pl-[64px] mb-5">
              <div className="h-7 w-7">
                <myIcons.UserPlusIconBold />
              </div>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  placeItems: "center",
                  fontWeight: "600",
                  fontSize: "28px",
                }}
                className="px-3"
              >
                Create User
              </Typography>
            </div>
            <Grid
              item
              xs={12}
              sm={12}
              lg={12}
              md={12}
              xl={12}
              sx={{
                px: 4,
                m: 0,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
                placeItems: "normal",
              }}
              className="sm:px-6 md:px-16 lg:px-20 xl:px-22"
            >
              <Grid sx={{}}>
                {userData.map((input) => {
                  return (
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
                  );
                })}
                <Input
                  props={{
                    inputType: {
                      type: showPassword ? "text" : "password",
                      value: selector[password]?.value,
                      required: true,

                      placeholder: "password",
                      name: password,
                      classN: "w-[100%]",
                      label: "text",
                      onChange: (e) => {
                        handleFormChange({ event: e, dispatch });
                        regexCheckFormFields({
                          event: e,
                          dispatch,
                          selector,
                          check: {
                            regex: passwordRegex,
                            message: "invalid password",
                          },
                        });
                      },
                    },
                    label: "password",
                    err: !selector[password]?.isValid,
                    helper: selector[password]?.isValid
                      ? selector[password]?.validMessage
                      : selector[password]?.errorMessage,
                    showHelper: selector[password]?.showMessage,
                    prefix: {
                      element: (
                        <div className="w-6 h-6 text-[var(--dark-2)]">
                          {" "}
                          <myIcons.LockIconBold />
                        </div>
                      ),
                    },
                    suffix: {
                      element: (
                        <div className="w-6 h-6">
                          {" "}
                          {showPassword ? <EyeSlash /> : <Eye />}
                        </div>
                      ),
                      click() {
                        setShowPassword(!showPassword);
                      },
                    },
                  }}
                />{" "}
                <div className=" flex flex-row align-bottom items-center justify-end ">
                  <div className="text-[12px]">
                    {" "}
                    generate <br></br> password{" "}
                  </div>
                  <div
                    className="w-8 h-8 text-[var(--dark-2)]"
                    onClick={() => {
                      dispatch(
                        setKeyValue({
                          [password]: {
                            isValid: true,
                            showMessage: false,

                            value: generateAlphanumericReference({
                              size: 10,
                              type: GeneratekeyE.password,
                            }),
                          },
                        })
                      );
                    }}
                  >
                    {" "}
                    <myIcons.FingerprintBold />
                  </div>
                </div>
              </Grid>

              <StyledButton
                className="btn-primary noBorder isFull mr-4 mt-10 mx-1 rounded-lg mb-1 flex flex-row  h-12 max-h-12 item-center align-middle"
                onClick={submit}
              >
                <Typography fontSize={"24px"} className="text-bold">
                  {" "}
                  submit
                </Typography>{" "}
                {isLoading && (
                  <div className="pb-6 px-2">
                    <Loading transparent color="white" size={36} />
                  </div>
                )}
              </StyledButton>
              {(isError || isSuccess) && (
                <div
                  className={clsx(
                    "mb-20 items-center flex justify-center",
                    isError ? "text-red-800" : "",
                    isSuccess ? "text-green-900" : ""
                  )}
                >
                  {isError
                    ? error.data.message
                    : isSuccess
                    ? "successfully created"
                    : ""}
                </div>
              )}
              <div className="mb-20"></div>
            </Grid>
          </Paper>
          <div className="mb-20"></div>
        </Grid>

        <Grid item xs sm md xl lg></Grid>
      </Grid>
    </div>
  );
}
