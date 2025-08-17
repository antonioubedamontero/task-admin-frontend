import {
  RegisterResponse,
  UserRegisterResponse,
} from '../../src/app/auth/interfaces';

export const userRegisterResponseData: UserRegisterResponse = {
  email: 'jhonDoe@gmail.com',
  name: 'Jhon',
  surname: 'Doe',
  _id: '6883e5c75a704d5e3b702a92',
};

export const registerResponseData: RegisterResponse = {
  user: userRegisterResponseData,
  token: 'ABC',
};
