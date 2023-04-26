import axiosClient from "./axiosClient";

const cityApi = {
  getCity(id: any) {
    const url = `location?pid=${id}`;
    return axiosClient.get(url);
  },
  
};

export default cityApi;
