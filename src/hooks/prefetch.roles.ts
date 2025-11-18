/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { RoleResponseI, useGetRolesQuery } from "../app/services/roles/roles";

export function useGetRolesHook() {
  const [rolesState, setRolesState] = useState<Record<string, any>>({});
  const [rolesData, setRolesData] = useState<RoleResponseI[]>([]);

  const {
    data: RolesData,
    isLoading: isRolesLoading,
    isSuccess: isRolesSuccess,
  } = useGetRolesQuery();

  // //console.log(selector);
  useEffect(() => {
    if (isRolesSuccess && RolesData) {
      setRolesData(RolesData);
    }
    if (isRolesSuccess && rolesData.length > 0) {
      const roles: Record<string, any> = {};
      rolesData.map((role) => {
        roles[role.name] = role.id;
        setRolesState(roles);
      });
    }
  }, [RolesData, isRolesSuccess, rolesData]);

  return {
    rolesState,
    rolesData,
    isRolesLoading,
    isRolesSuccess,
  };
}
