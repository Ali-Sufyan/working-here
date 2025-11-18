/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactElement, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetRoleFromUserRoleMutation } from "../../../app/services/roles/roles";
// import { setRole } from "../../../app/slices/branded/roles/roles.slice";
import {
/* useAppDispatch, */ useAppSelector,
} from "../../../app/slices/hooks";

interface Props {
  children: ReactElement;
  permissions: string | string[];
  redirect?: string;
}

export const PermissionProtocol: FC<Props> = ({
  children,
  permissions,
  redirect,
}) => {
  const user = useAppSelector((state) => state.auth.user, shallowEqual);
  const [role, { data }] = useGetRoleFromUserRoleMutation();
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchRole = async () => {
      if (user && user.role) {
        await role(user.role);
      }
    };

    fetchRole();
  }, [user, navigate, role]);

  useEffect(() => {
    if (data?.permissions) {
      const checkPermission = () => {
        if (Array.isArray(permissions)) {
          const permitted = permissions.every((pe) =>
            data.permissions.includes(pe)
          );
          setHasPermission(permitted);
        } else {
          const permitted = data.permissions.includes(permissions);
          setHasPermission(permitted);
        }
      };

      checkPermission();
    }
  }, [data, permissions]);

  useEffect(() => {
    if (hasPermission === false) {
      navigate(redirect ?? "/", { replace: true });
    }
  }, [hasPermission, navigate, redirect]);

  // Only render children if permissions are confirmed
  if (hasPermission === null || hasPermission === false) {
    return null;
  }

  return children;
};
/**
 * Custom hook that checks if a user has the required permissions.
 * @param permissions - The permission(s) to check.
 * @returns True if the user has all the required permissions, false otherwise.
 */
export const useCheckPermissions = () => {
  const role = useAppSelector((state) => state.role, shallowEqual);

  const permit = (permissions?: string[], exception?: string[]) => {
  
    let filteredPermissions = permissions;

    if (exception && exception.length > 0) {
      // Remove any strings in permissions that are also in exception
      filteredPermissions = filteredPermissions?.filter(
        (permission) => !exception.includes(permission)
      );
    }

    if (filteredPermissions === undefined || filteredPermissions === null) {
      return true;
    }

    if (filteredPermissions.length === 0) {
      return true;
    }

    return filteredPermissions.some((permission) =>
      role.permissions.includes(permission)
    );
  };

  return { permit };
};

export function useGetRoleByCrypt(id: string) {
  const [roleState, setRoleState] = useState<any>();
  const [role, { isLoading, isSuccess }] = useGetRoleFromUserRoleMutation();
  useEffect(() => {
    const getRole = async () => {
      const roleResponse = await role(id);
      if (roleResponse) setRoleState(roleResponse);
    };
    getRole();
  }, [id, role]);

  return { roleState, isLoading, isSuccess };
}


