export interface ISignUpFormData {
    email: string;
    password: string;
    confirm_password: string;
    name: string;
  }
export interface ISignInFormData {
    email: string;
    password: string;
  }
export interface  ICreatePostFormData {
  title: string;
  image: string;
  tags: string[];
}
