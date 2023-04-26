export interface ILoginParams {
  email: string;
  password: string;
}

export interface ICountryParams {
  id: number;
  pid: any;
  name: string;
  createAt?: string;
}
export interface ISignUpParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: number | string;
  state: number | string;
}
