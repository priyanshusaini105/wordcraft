# 📝 WordCraft Blog

Welcome to WordCraft, a platform where you can share your thoughts with the world. With WordCraft, you can create an account, post your blog articles, and connect with other writers. We provide authentication through Firebase email and password, and signup with Google.

## 🚀 Technologies Used

WordCraft is built using the following technologies:

- Next.js version 13 🌐
- TypeScript 🌟
- Firebase Authentication 🔥
- Firebase Realtime Database 📊
- Tailwind CSS 🎨
- TinyMCE editor 🖋️

## ✨ Features

Here are some of the features that WordCraft offers:

- User authentication through Firebase email and password, and signup with Google
- Simple and intuitive interface 🤗
- Users can create, edit, and delete their blog posts
- Admins can edit and delete any post
- Readers can only read the blog posts 📖
- Posts are fetched on the server using the `getServerSideProps` function in Next.js
- TinyMCE editor is used for rich text editing
- Tailwind CSS is used for styling 🎨

## 🏁 Getting Started

To get started with WordCraft, follow these simple steps:

1. Clone the repository
2. Install the dependencies using `npm install`
3. Set up the Firebase project and add the credentials in the `.env.local` file
```
NEXT_PUBLIC_API_KEY= [YOUR_API_KEY_FROM_FIREBASE]
NEXT_PUBLIC_AUTH_DOMAIN= [YOUR_AUTH_DOMAIN_FROM_FIREBASE]
NEXT_PUBLIC_PROJECT_ID= [YOUR_PROJECT_ID_FROM_FIREBASE]
NEXT_PUBLIC_DATABASE_URL= [YOUR_DATABASE_URL_FROM_FIREBASE]
NEXT_PUBLIC_STORAGE_BUCKET= [YOUR_STORAGE_BUCKET_FROM_FIREBASE]
NEXT_PUBLIC_MESSAGING_SENDER_ID= [YOUR_MESSAGING_SENDER_ID_FROM_FIREBASE]
NEXT_PUBLIC_APP_ID= [YOUR_APP_ID_FROM_FIREBASE]
NEXT_PUBLIC_MEASUREMENT_ID= [YOUR_MEASUREMENT_ID_FROM_FIREBASE]
NEXT_PUBLIC_TINYMCE_API_KEY= [YOUR_TINYMCE_API_KEY]
```
4. Run the development server using `npm run dev`
5. Open `http://localhost:3000` in your browser to view the website

## 🎉 Demo

You can view the live demo of the website at https://wordcraft-blog.vercel.app/

## 🤝 Contributing

We welcome contributions to the WordCraft project. If you have any suggestions or would like to contribute to the project, please submit a pull request.

## 📄 License

This project is licensed under the MIT License.

## 📝 About WordCraft

WordCraft is a blog website built using Next.js, a popular React framework. It provides a platform for writers to share their thoughts and connect with other writers. Users can create an account, and then create, edit, and delete their own blog posts. Admins have the ability to edit and delete any post. Readers can browse the website and read the blog posts.

WordCraft uses Firebase Authentication to handle user authentication and Firebase Realtime Database to store the blog post data. The posts are fetched on the server using the `getServerSideProps` function in Next.js. The TinyMCE editor is used for rich text editing, and Tailwind CSS is used for styling.

The project is open source, and we welcome contributions from anyone interested in helping us improve WordCraft.
