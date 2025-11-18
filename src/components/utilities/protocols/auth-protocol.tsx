import { useAuth0 } from "@auth0/auth0-react";
import { FC, ReactElement, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../styles/loading";

interface Props {
  children: ReactElement;
  redirect?: string;
}

export const AuthProtocol: FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/logout");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <Loading fullscreen={false} transparent={true} />;
  }


  else if (!isAuthenticated) {
    return <Navigate to={"/logout"} replace={true} />;
  }
  else {

    return children;
  }

};
