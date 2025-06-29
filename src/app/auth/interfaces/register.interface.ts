export interface RegisterRequest {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export interface RegisterResponse {
  user: UserRegisterResponse;
  token: string;
}

export interface UserRegisterResponse {
  email: string;
  name: string;
  surname: string;
  _id: string;
}
