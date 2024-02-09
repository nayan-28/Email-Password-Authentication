// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcXvCY0bHOFvWoTfPgD4eCRA3pQWrNBs8",
    authDomain: "user-email-password-auth-489a9.firebaseapp.com",
    projectId: "user-email-password-auth-489a9",
    storageBucket: "user-email-password-auth-489a9.appspot.com",
    messagingSenderId: "300742448168",
    appId: "1:300742448168:web:46c565c18bf2d8a4a0111d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
