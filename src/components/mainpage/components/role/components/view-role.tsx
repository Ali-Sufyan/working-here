import { Grid, Paper, Typography } from "@mui/material";
import { LucideSettings } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { allPermissions } from "../../../../../app/permissions";
import { useGetPermissionsQuery } from "../../../../../app/services/roles/permission";
import {
  RoleResponseI,
  useDeleteRoleMutation,
  useGetRoleQuery,
  useUpdateRoleMutation,
} from "../../../../../app/services/roles/roles";
import { deleteFormKeys } from "../../../../../app/slices/forms/forms.type";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../app/slices/hooks";
import { openDeleteModal } from "../../../../../app/slices/modal/modal.types";
import { colorScheme } from "../../../../utilities/color-scheme";
import DeleteModal from "../../../../utilities/crud/delete";
import { validateFormKeys } from "../../../../utilities/forms/hooks/validateFields";
import { myIcons } from "../../../../utilities/icons";
import CustomModal from "../../../../utilities/modal/modal";
import StyledButton from "../../../../utilities/styles/buton";
import Loading from "../../../../utilities/styles/loading";
import { capitalize } from "../../../../utilities/utils";

export function FetchRoleForView() {
  const { roleId } = useParams<{ roleId: string }>();

  const { data: onerole, isFetching, isLoading } = useGetRoleQuery(roleId!);

  return onerole ? (
    <ViewRole roleDetails={onerole} />
  ) : isFetching || isLoading ? (
    <Loading fullscreen transparent />
  ) : (
    <></>
  );
}

const permissionName: string[] = Object.keys(allPermissions).map((key) =>
  key.toLowerCase()
);

export function ViewRole({ roleDetails }: { roleDetails: RoleResponseI }) {
  const { data, isLoading, isSuccess } = useGetPermissionsQuery();
  const [call, setCall] = useState<boolean>(true);

  const [del] = useDeleteRoleMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      if (call) {
        await del(id);
        navigate(-1);
        // Assuming this is used for disabling the button
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setCall(false);
    }
  };
  const [role, { isLoading: isRoleLoading, isSuccess: isRoleSuccess }] =
    useUpdateRoleMutation();
  const selector = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const formName = "create-role-form";
  const name = `${formName}-name`;
  const details = `${formName}-details`;

  const selectedPermissions = roleDetails.permissions;

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
      {
        <CustomModal
          children={
            <DeleteModal
              props={{
                id: roleDetails.id,
                confirm: handleDelete,
                metadata: [`${roleDetails.name} `],
              }}
            />
          }
        />
      }
      <Grid container>
        <Grid item xs md sm xl lg></Grid>

        <Grid xs={12} sm={12} lg={10} md={10} xl={10}>
          <Paper
            elevation={2}
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
            <div className="bg-[var(--gray-2)] p-4 shadow-md flex flex-col align-middle sm:pl-[32px] md:pl-[48px] xl:pl-[64px] text-[var(--dark-1)] lg:pl-[64px] mb-5">
              <div className="flex flex-row justify-start items-center ">
                <div className="h-10 w-10 ">
                  <LucideSettings />
                </div>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    placeItems: "center",

                    fontSize: "28px",
                  }}
                  className="px-3"
                >
                  {capitalize({ text: roleDetails.name })} Role
                </Typography>
              </div>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  placeItems: "center",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
                className="px-3"
              >
                {capitalize({ text: roleDetails.details })}
              </Typography>
            </div>
            {isLoading ? (
              <Loading transparent size={80} />
            ) : (
              <div className="">
                <div className="text-[26px] px-12 py-2 font-semibold">
                  {capitalize({ text: "permissions" })}
                </div>{" "}
                <Grid container gap={2} xs={12} className="px-10 ">
                  {permissionName.map((e, key) => (
                    <>
                      {isSuccess &&
                        filterPermissions(e) &&
                        filterPermissions(e)?.filter((d) =>
                          selectedPermissions.includes(d.name)
                        ) &&
                        filterPermissions(e)!.filter((d) =>
                          selectedPermissions.includes(d.name)
                        ).length > 0 && (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            lg={12}
                            xl={12}
                            md={12}
                            className=""
                          >
                            <Paper
                              key={key}
                              className="w-full px-10"
                              sx={{
                                borderRadius: "10px",

                                borderTop: 1,
                                background: colorScheme.gray_0,
                                borderColor: colorScheme.primary,
                              }}
                            >
                              {isSuccess &&
                                filterPermissions(e) &&
                                filterPermissions(e)?.filter((d) =>
                                  selectedPermissions.includes(d.name)
                                ) &&
                                filterPermissions(e)!.filter((d) =>
                                  selectedPermissions.includes(d.name)
                                ).length > 0 &&
                                filterPermissions(e)
                                  ?.filter((d) =>
                                    selectedPermissions.includes(d.name)
                                  )
                                  .map((d, k) => (
                                    <div
                                      className="py-2 flex align-middle items-center p-0"
                                      key={k}
                                    >
                                      <div className="text-[var(--primary-dark)] h-6 w-6">
                                        <myIcons.PermissionIcon />
                                      </div>{" "}
                                      <div className="">{d.details}</div>
                                    </div>
                                  ))}
                            </Paper>
                          </Grid>
                        )}
                    </>
                  ))}
                </Grid>
              </div>
            )}{" "}
            <div className="px-[100px] pb-10 flex flex-row">
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
                <NavLink to={`/role/${roleDetails.id}/edit`}>
                  <Typography fontSize={"24px"} className="text-bold">
                    {" "}
                    edit
                  </Typography>{" "}
                </NavLink>
                {isRoleLoading && (
                  <div className="pb-6 px-2">
                    <Loading transparent color="white" size={36} />
                  </div>
                )}
              </StyledButton>{" "}
              <StyledButton
                className="btn-secondary noBorder  px-8 mt-10 mx-1 rounded-lg mb-1 flex flex-row  h-12 max-h-12 item-center align-middle"
                onClick={() => {
                  dispatch(openDeleteModal());
                }}
              >
                <Typography fontSize={"24px"} className="text-bold">
                  {" "}
                  delete
                </Typography>{" "}
                {isRoleLoading && (
                  <div className="pb-6 px-2">
                    <Loading transparent color="white" size={36} />
                  </div>
                )}
              </StyledButton>
            </div>
          </Paper>
        </Grid>
        <Grid item xs md sm xl lg></Grid>
      </Grid>
    </div>
  );
}
