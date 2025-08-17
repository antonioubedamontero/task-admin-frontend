import {
  LoginResponse,
  UserLoginResponse,
} from '../../src/app/auth/interfaces/index';

export const userLogingResponseData: UserLoginResponse = {
  _id: '6883e5c75a704d5e3b702a92',
  email: 'jhonDoe@gmail.com',
  name: 'Jhon',
  surname: 'Doe',
  createdAt: '2025-07-25T20:15:03.211Z',
  updatedAt: '2025-07-25T20:15:03.211Z',
};

export const loginResponseData: LoginResponse = {
  user: userLogingResponseData,
  token: 'ABC',
};
