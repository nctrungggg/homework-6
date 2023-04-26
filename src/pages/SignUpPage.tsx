import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../configs/routes";
import { ISignUpParams } from "../models/auth";
import SignUpForm from "../modules/auth/components/SignUpForm";
import { getCity, getCountry, register } from "../modules/auth/redux/AuthSlice";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const { t } = useTranslation("translation");

  const countryList = useSelector((state: any) => state.auth.country);
  const cityList = useSelector((state: any) => state.auth.city);

  const authToken = sessionStorage.getItem("access_token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      const action = getCountry();

      const resultAction = await dispatch<any>(action);
      unwrapResult(resultAction);
    };

    fetchCountry();
  }, []);

  const handleFetchCity = async (id: any) => {
    const action = getCity(id);

    const resultAction = await dispatch<any>(action);
    unwrapResult(resultAction);
  };

  const handleSubmitForm = async (values: ISignUpParams) => {
    console.log("values", values);

    const action = register(values);

    const resultAction = await dispatch<any>(action);
    unwrapResult(resultAction);

    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        toast.success("Register is successfully!!", {
          autoClose: 2000,
        });

        navigate(ROUTES.home);
      }, 2000);
    } catch (error: any) {
      setTimeout(() => {
        setLoading(false);

        toast.error("Something went wrong!!");
      }, 2000);
    }
  };

  if (authToken) {
    return <Navigate to={ROUTES.pageNotFound} />;
  }

  return (
    <div className="flex justify-center p-12">
      <div className="rounded-xl w-[450px] shadow-md overflow-auto h-[600px] py-10 px-14">
        <h1 className="mb-10 text-3xl font-semibold text-center">
          {t("signUp")}
        </h1>

        <SignUpForm
          countryList={countryList}
          onSubmitForm={handleSubmitForm}
          loading={loading}
          handleFetchCity={handleFetchCity}
          cityList={cityList}
        />
      </div>

      <div className="w-[450px] shadow-xl h-[600px] hidden lg:block">
        <img
          className="object-cover w-full h-full rounded-xl"
          src="https://images.pexels.com/photos/3585089/pexels-photo-3585089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
      </div>
    </div>
  );
};

export default SignUpPage;
