import { ILoginParams, ISignUpParams } from "../models/auth";
import axiosClient from "./axiosClient";

const userApi = {
  login(data: ILoginParams) {
    const url = "auth/login";
    return axiosClient.post(url, data);
  },

  register(data: ISignUpParams) {
    console.log(data);

    const url = "auth/register";
    return axiosClient.post(url, data);
  },

  getInfoUser() {
    const url = "user";
    return axiosClient.get(url);
  },

  updateInfoUser(formData: any, config: any) {
    const url = "user";
    return axiosClient.put(url, formData, config);
  },
};

export default userApi;
