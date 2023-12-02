import { gender } from './gender.enum';

export interface User {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: gender;
  terms: boolean;
  pictureInBase64: string;
  country: string;
}
