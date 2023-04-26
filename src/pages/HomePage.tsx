import { Navigate } from "react-router-dom";
import { ROUTES } from "../configs/routes";
import SignInPage from "./SignInPage";

type Props = {};

const HomePage = (props: Props) => {
  const authToken = sessionStorage.getItem("access_token");

  if (!authToken)
    return authToken ? <SignInPage /> : <Navigate to={ROUTES.login} />;

  return (
    <div className="p-20">
      <div className="flex justify-between">
        <div className="max-w-[500px]">
          <h1 className="text-5xl font-semibold text-center mb-5">Home Page</h1>
          <p className="text-lg text-justify mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit velit id neque odit nihil, minima quod nobis. Eius
            deserunt voluptas provident corrupti soluta a, impedit repudiandae
            eaque debitis necessitatibus itaque?
          </p>
          <p className="text-lg text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit velit id neque odit nihil, minima quod nobis. Eius
            deserunt voluptas provident corrupti soluta a, impedit repudiandae
            eaque debitis necessitatibus itaque?
          </p>
        </div>
        <div className="h-[600px] w-[500px]">
          <img
            className="h-full w-full object-cover"
            src="https://images.pexels.com/photos/4132651/pexels-photo-4132651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
