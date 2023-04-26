import axiosClient from "./axiosClient";

const userApi = {
  login(data: any) {
    const url = "auth/login";
    return axiosClient.post(url, data);
  },

  register(data: any) {
    const url = "auth/register";
    return axiosClient.post(url, data);
  },

  getInfoUser() {
    const url = "user";
    return axiosClient.get(url);
  },
};

export default userApi;
