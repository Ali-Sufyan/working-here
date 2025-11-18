import { useNavigate } from "react-router-dom";

export const useCustomNavigationHook = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return {
    handleNavigate,
  };
};
