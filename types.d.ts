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
export interface IProfileData{
  name:string;
  email:string;
  role:"admin"|"author"|"reader";
  photo:string;
  userId:string;
  login:boolean;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  image: string;
  author:string;
}
export interface IPostsData {
  [key: string]: IPost;
}
export interface IPostQuery{
  userId:string;
  postId:string;
}
export interface Comment {
  user: string;
  comment: string;
}

export interface ICommentsData{
  [postId:string]:Comment
}