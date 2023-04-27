import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import Input from "../../../components/input/Input";
import Label from "../../../components/label/Label";
import { ICountryParams, ISignUpParams } from "../../../models/auth";
import { useTranslation } from "react-i18next";

interface Props {
  onSubmitForm(values: ISignUpParams): Promise<void>;
  loading: boolean;
  countryList: ICountryParams[];
  handleFetchCity(id: string): void;
  cityList: ICountryParams;
}

const SignUpForm = ({
  onSubmitForm,
  loading,
  handleFetchCity,
  countryList,
  cityList,
}: Props) => {
  const { t } = useTranslation("translation");

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("nameRequire")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "nameRequireLatin"
      )
      .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, "nameRequireFullName"),
    email: yup.string().email("emailInvalid").required("emailRequire"),
    password: yup
      .string()
      .required("passwordRequire")
      .min(6, "minPasswordInvalid"),
    repeatPassword: yup
      .string()
      .required("repeatPassword")
      .oneOf([yup.ref("password")], "repeatPasswordWrong"),
    gender: yup
      .string()
      .required("genderRequire")
      .oneOf(["male", "female", "other"], "genderRequire"),
    region: yup.string().required("regionRequire"),
    state: yup.string().required("stateRequire"),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [disableCity, setDisableCity] = useState(false);

  const handleSignUp = (values: ISignUpParams) => {
    if (!isValid) return;

    onSubmitForm(values);
  };

  const handleChangeCountry = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    register("region").onChange(e);

    if (e.target.value === "") return setDisableCity(false);

    setDisableCity(true);

    handleFetchCity(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
      <div className="mb-4">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          type="email "
          name="email"
          placeholder={t("placeholderEmail")}
          control={control}
        />

        <p className="pt-3 text-red-500 text-[13px]">
          {errors.email && t(errors.email.message)}
        </p>
      </div>

      <div className="mb-4">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          type="password"
          name="password"
          placeholder={t("placeholderPassword")}
          control={control}
        />
        <p className="pt-3 text-red-500 text-[13px]">
          {errors.password && t(errors.password.message)}
        </p>
      </div>

      <div className="mb-4">
        <Label htmlFor="repeatPassword">{t("repeatPassword")}</Label>
        <Input
          type="password"
          name="repeatPassword"
          placeholder={t("placeholderPassword")}
          control={control}
        />
        <p className="pt-3 text-red-500 text-[13px]">
          {errors.repeatPassword && t(errors.repeatPassword.message)}
        </p>
      </div>

      <div className="mb-4">
        <Label htmlFor="fullame">{t("name")}</Label>
        <Input
          type="text"
          name="name"
          placeholder={t("placeholderName")}
          control={control}
        />
        <p className="pt-3 text-red-500 text-[13px]">
          {" "}
          {errors.name && t(errors.name.message)}
        </p>
      </div>

      <div className="mb-6">
        <Label htmlFor="gender">{t("gender")}</Label>
        <select
          {...register("gender")}
          name="gender"
          id="gender"
          className="cursor-pointer block py-2.5 px-0 w-full text-[13px] text-gray-600 bg-transparent border-0 border-b-[1px] border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-300 peer "
        >
          <option value="">{t(`chooseGender`)}</option>
          <option value="male">{t("male")}</option>
          <option value="female">{t("female")}</option>
          <option value="other">{t("other")}</option>
        </select>
        <p className="pt-3 text-red-500 text-[13px]">
          {errors.gender && t(errors.gender.message)}
        </p>
      </div>

      <div className="mb-4">
        <Label htmlFor="region">{t("region")}</Label>
        <select
          {...register("region")}
          name="region"
          id="underline_select"
          className="cursor-pointer block py-2.5 px-0 w-full text-[13px] text-gray-600 bg-transparent border-0 border-b-[1px] border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-300 peer"
          onChange={(e) => handleChangeCountry(e)}
        >
          <option value="">{t("chooseRegion")}</option>

          {countryList?.map((country: ICountryParams) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>

        <p className="pt-3 text-red-500 text-[13px]">
          {errors.region && t(errors.region.message)}
        </p>
      </div>

      {disableCity && (
        <div className="mb-6">
          <Label htmlFor="state">{t("state")}</Label>
          <select
            defaultValue={"DEFAULT"}
            {...register("state")}
            name="state"
            id="underline_select"
            className=" cursor-pointer block py-2.5 px-0 w-full text-[13px] text-gray-600 bg-transparent border-0 border-b-[1px] border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-300 peer"
          >
            <option value="">{t("chooseState")}</option>

            {cityList?.map((country: ICountryParams) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <p className="pt-3 text-red-500 text-[13px]">
            {errors.state && t(errors.state.message)}
          </p>
        </div>
      )}

      <p className="mt-10 mb-6 text-sm">
        {t("textLogin")}{" "}
        <NavLink className="font-medium" to={"/sign-in"}>
          {t("login")}
        </NavLink>{" "}
      </p>

      <button
        disabled={loading}
        type="submit"
        className="cursor-pointer  p-4 bg-[#0e7490] rounded-xl w-[180px] block m-auto text-white"
      >
        {loading ? (
          <div>
            <svg
              aria-hidden="true"
              className="inline-block w-8 h-8 mr-2 text-center text-white animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                className="text-slate-300"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          t("signUp")
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
