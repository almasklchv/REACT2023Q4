export interface User {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  terms?: boolean;
  pictureInBase64?: string;
  country?: string;
}
