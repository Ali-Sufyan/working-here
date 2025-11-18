import { Grid, Paper, Typography } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import { allPermissions } from "../../../../../app/permissions";
import { useGetPermissionsQuery } from "../../../../../app/services/roles/permission";
import {
  RoleResponseI,
  useGetRoleQuery,
  useUpdateRoleMutation,
} from "../../../../../app/services/roles/roles";
import {
  deleteFormKeys,
  setKeyValue,
} from "../../../../../app/slices/forms/forms.type";
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

export function FetchRoleForUpdate() {
  const { roleId } = useParams<{ roleId: string }>();

  const { data: oneUser, isFetching, isLoading } = useGetRoleQuery(roleId!);

  return oneUser ? (
    <UpdateRole roleDetails={oneUser} />
  ) : isFetching || isLoading ? (
    <Loading fullscreen transparent />
  ) : (
    <></>
  );
}

export function UpdateRole({ roleDetails }: { roleDetails: RoleResponseI }) {
  const { data, isLoading, isSuccess } = useGetPermissionsQuery();
  const [
    role,
    {
      isLoading: isRoleLoading,
      isSuccess: isRoleSuccess,

      isError: isRoleError,
    },
  ] = useUpdateRoleMutation();
  const selector = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const formName = "create-role-form";
  const name = `${formName}-name`;
  const details = `${formName}-details`;

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    roleDetails.permissions
  );
  useEffect(() => {
    dispatch(
      setKeyValue({
        [name]: { value: roleDetails.name, isValid: true, showMessage: false },
        [details]: {
          value: roleDetails.details,
          isValid: true,
          showMessage: false,
        },
      })
    );
  }, []);

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
        await role({
          details: selector[details]?.value,
          permissions: selectedPermissions,
          id: roleDetails.id,
        });
      }

      if (isRoleSuccess) {
        dispatch(deleteFormKeys([name, details]));
      }
    } catch (e) {
      console.log(e);
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
              <div className="h-10 w-10 ">
                <myIcons.RoleIconBold />
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
                Update Role
              </Typography>
            </div>
            <div className="px-14 py-10">
              <Input
                props={{
                  inputType: {
                    type: "text",
                    value: selector[name]?.value,
                    required: true,
                    disabled: true,

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
                <div className="text-[26px] px-8 font-semibold">
                  {capitalize({ text: "permissions" })}
                </div>{" "}
                <div className="py-5 pr-[150px] font-semibold">
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
                {Object.keys(allPermissions).map((e) => (
                  <>
                    <Divider content="" className="mx-5" />
                    <div className="text-[20px] px-8  font-medium">
                      {capitalize({ text: splitByUppercase(e).join(" ") })}
                    </div>
                    {isLoading ? (
                      <>
                        <Loading transparent size={80} />
                      </>
                    ) : (
                      isSuccess &&
                      filterPermissions(e.toLowerCase())?.map((d) => (
                        <div className="py-5 pr-[150px]">
                          <Input
                            props={{
                              inputType: {
                                type: "checkbox",
                                onChange: () => handleCheckboxChange(d.name),
                                checked: selectedPermissions.includes(d.name),
                              },
                              label: d.details,
                            }}
                          />
                        </div>
                      ))
                    )}
                  </>
                ))}
              </div>
            )}{" "}
            <div className="px-[100px] pb-10">
              <StyledButton
                className="btn-primary noBorder  px-8 mt-10 mx-1 rounded-lg mb-1 flex flex-row  h-12 max-h-12 item-center align-middle"
                onClick={() => {
                  submit();
                  if (isRoleSuccess) {
                    toast.success("Role created successfully");
                    dispatch(deleteFormKeys([name, details]));
                  }
                }}
              >
                <Typography fontSize={"24px"} className="text-bold">
                  {" "}
                  update
                </Typography>{" "}
                {isRoleLoading && (
                  <div className="pb-6 px-2">
                    <Loading transparent color="white" size={36} />
                  </div>
                )}
              </StyledButton>

              {(isRoleError || isRoleSuccess) && (
                <div
                  className={clsx(
                    "mb-20 items-center flex justify-center",
                    isRoleError ? "text-red-800" : "",
                    isRoleSuccess ? "text-green-900" : ""
                  )}
                >
                  {isRoleSuccess && toast.success("successfully updated")}
                  {isRoleError && toast.error("error updating")}
                  {isRoleSuccess && <Navigate to="/role" />}
                </div>
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item xs md sm xl lg></Grid>
      </Grid>
    </div>
  );
}
