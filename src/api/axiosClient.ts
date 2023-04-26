import axios from "axios";
import { API_HOST } from "../constants/constants";

const authToken = sessionStorage.getItem("access_token");

const axiosClient = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
    Authorization: authToken,
  },
});

export default axiosClient;
