// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw0VcpyZuQkyw0X874leS-9w_2mv4IZks",
  authDomain: "wordcraft-6c2f8.firebaseapp.com",
  projectId: "wordcraft-6c2f8",
  storageBucket: "wordcraft-6c2f8.appspot.com",
  messagingSenderId: "121545285033",
  appId: "1:121545285033:web:5180896796344f1962f8b8",
  measurementId: "G-25YENX2G4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);