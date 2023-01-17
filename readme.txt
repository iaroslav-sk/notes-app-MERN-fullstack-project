// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNxWcW9QNxmrxYkj4Jd6Yl43GGlF0Uoj8",
  authDomain: "fullstack-notise-app.firebaseapp.com",
  projectId: "fullstack-notise-app",
  storageBucket: "fullstack-notise-app.appspot.com",
  messagingSenderId: "692677481778",
  appId: "1:692677481778:web:944ea6a537222d76e7b32b",
  measurementId: "G-SNJCZCCHRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);