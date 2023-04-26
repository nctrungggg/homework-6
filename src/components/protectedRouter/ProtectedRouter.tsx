import { Navigate, Route } from "react-router-dom";
import { ROUTES } from "../../configs/routes";

interface Props {
  path: string;
  element: any;
}
const ProtectedRoute = (props: Props) => {
  const { ...rest } = props;

  const authToken = sessionStorage.getItem("access_token");

  if (authToken) {
    return <Route {...rest} />;
  }

  return (
    <Navigate
      to={{
        pathname: ROUTES.login,
      }}
    />
  );
};

export default ProtectedRoute;
