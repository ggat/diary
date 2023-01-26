// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import 'firebaseui/dist/firebaseui.css'
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiHoCyYxEK-okT9v54yFOSw8rDFj65ccQ",
    authDomain: "diary-4c95d.firebaseapp.com",
    projectId: "diary-4c95d",
    storageBucket: "diary-4c95d.appspot.com",
    messagingSenderId: "371666348216",
    appId: "1:371666348216:web:0fa966a828ce482c2c6c4d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);
export { auth, database, ui };
