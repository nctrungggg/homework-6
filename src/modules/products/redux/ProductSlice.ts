import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../../api/productApi";
import { STORAGE_KEY } from "../../../constants/constants";

interface FilterParams {
  status?: string;
  client?: string;
  from?: string;
  to?: string;
  invoice?: string;
}

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    const data = await productApi.getAllProduct();

    const productList = data.data.data;

    // save data to local storage
    sessionStorage.setItem(
      STORAGE_KEY.PRODUCT_LIST,
      JSON.stringify(productList)
    );

    return productList;
  }
);

export const getDetailProduct = createAsyncThunk(
  "product/getDetailProduct",
  async (id: string) => {
    const data = await productApi.getDetailProduct(id);
    const detailProduct = data.data.data;

    return detailProduct;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number) => {
    await productApi.deleteProduct(id);
    return;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data: any) => {
    await productApi.updateProduct(data);
    return;
  }
);

const productSlice = createSlice({
  name: "product",

  initialState: {
    productList: [],
    detailProduct: {},
    filterProduct: [],
  },

  reducers: {
    filterProduct: (state, action: PayloadAction<FilterParams>) => {
      const { status, client, from, to, invoice } = action.payload;

      state.filterProduct = [...state.productList];

      if (status && status !== "") {
        state.filterProduct = state.filterProduct.filter((item: any) =>
          item?.status?.toLowerCase().includes(status?.toLowerCase())
        );
      }

      if (client && client !== "") {
        state.filterProduct = state.filterProduct.filter((item: any) =>
          item?.client?.toLowerCase()?.includes(client?.toLowerCase())
        );
      }
    },
  },

  extraReducers: {
    [getAllProduct.fulfilled.toString()]: (state: any, action: any) => {
      state.productList = action.payload;
    },

    [getDetailProduct.fulfilled.toString()]: (state: any, action: any) => {
      state.detailProduct = action.payload;
    },
  },
});

const { actions, reducer } = productSlice;

export const { filterProduct } = actions;
export default reducer;
