import { IProductParams } from "../models/product";
import axiosClient from "./axiosClient";

const productApi = {
  getAllProduct() {
    const url = "product";
    return axiosClient.get(url);
  },

  getDetailProduct(id: string) {
    const url = `product/${id}`;
    return axiosClient.get(url);
  },

  updateProduct(data: IProductParams) {
    const url = "product";
    return axiosClient.put(url, data);
  },

  deleteProduct(id: number) {
    const url = `product/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
