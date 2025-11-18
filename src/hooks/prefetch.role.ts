import { shallowEqual } from "react-redux";
import { useGetRoleFromUserRoleMutation } from "../app/services/roles/roles";
import { useAppSelector } from "../app/slices/hooks";

export const usePreFetchRole = () => {
  const user = useAppSelector((state) => state.auth.user, shallowEqual);

  const [role] = useGetRoleFromUserRoleMutation();
  if (user && user.role) {
    role(user.role);

    // dispatch(setRole(fetchedRole));
  }
  return null;
};
