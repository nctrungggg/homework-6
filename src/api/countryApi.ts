import axiosClient from "./axiosClient";

const countryApi = {
  getCountry() {
    const url = "location";
    return axiosClient.get(url);
  },

  getCity(id: any) {
    const url = `location?pid=${id}`;
    return axiosClient.get(url);
  },
};

export default countryApi;
