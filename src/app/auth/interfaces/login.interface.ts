export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserLoginResponse;
  token: string;
}

export interface UserLoginResponse {
  _id: string;
  email: string;
  name: string;
  surname: string;
  createdAt: Date;
  updatedAt: Date;
}
