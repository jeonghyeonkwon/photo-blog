export interface IUserRegisterDto {
  userId: string;
  password: string;
  name: string;
  tel: string;
  email: string;
}

export interface IUserLoginDto {
  userId: string;
  password: string;
}
