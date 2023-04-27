import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import countryApi from "../../../api/countryApi";
import userApi from "../../../api/userApi";
import { STORAGE_KEY } from "../../../constants/constants";

export const login = createAsyncThunk("auth/login", async (payload: any) => {
  const { data } = await userApi.login(payload);
  const user = data.data;

  // save data to local storage
  sessionStorage.setItem(STORAGE_KEY.TOKEN, user.token);
  sessionStorage.setItem(STORAGE_KEY.USER, JSON.stringify(user));

  return user;
});

export const register = createAsyncThunk(
  "auth/register",
  async (payload: any) => {
    const data = await userApi.register(payload);

    const userRigister = data.data;

    // save data to local storage
    sessionStorage.setItem(STORAGE_KEY.TOKEN, userRigister.token);
    sessionStorage.setItem(STORAGE_KEY.USER, JSON.stringify(userRigister));

    return userRigister;
  }
);

export const getInfoUser = createAsyncThunk("auth/info", async () => {
  const data = await userApi.getInfoUser();

  const userInfo = data.data.data;
  console.log(userInfo);

  return userInfo;
});

export const getCountry = createAsyncThunk(
  "auth/register/country",
  async () => {
    const { data } = await countryApi.getCountry();
    const country = data.data;

    return country;
  }
);

export const getCity = createAsyncThunk(
  "auth/register/city",
  async (id: number) => {
    const data = await countryApi.getCity(id);

    const city = data.data.data;

    return city;
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    country: [],
    city: [],
  },

  reducers: {
    logout: (state) => {
      sessionStorage.clear()
      // sessionStorage.removeItem(STORAGE_KEY.TOKEN);
      // sessionStorage.removeItem(STORAGE_KEY.USER);
      // sessionStorage.removeItem(STORAGE_KEY.PRODUCT_LIST);

      state.currentUser = null;
    },
  },

  extraReducers: {
    [login.fulfilled.toString()]: (state: any, action: any) => {
      state.currentUser = action.payload;
    },

    [register.fulfilled.toString()]: (state: any, action: any) => {
      state.currentUser = action.payload;
    },

    [getCountry.fulfilled.toString()]: (state: any, action: any) => {
      state.country = action.payload;
    },

    [getCity.fulfilled.toString()]: (state: any, action: any) => {
      state.city = action.payload;
    },

    [getInfoUser.fulfilled.toString()]: (state: any, action: any) => {
      state.currentUser = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export const { logout } = actions;
export default reducer;
