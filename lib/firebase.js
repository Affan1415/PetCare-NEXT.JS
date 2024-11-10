// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWcirfGAMt_xo4O-6Dni8qUBe2WcVxMSY",
    authDomain: "pets-care-5f3a5.firebaseapp.com",
    projectId: "pets-care-5f3a5",
    storageBucket: "pets-care-5f3a5.firebasestorage.app",
    messagingSenderId: "621161307121",
    appId: "1:621161307121:web:6a0f3826d9d922c1e64250",
    measurementId: "G-NXG8SF33DC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth};