import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Front from "./Front";
import reportWebVitals from "./reportWebVitals";
import CurrentDay from "./CurrentDay";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <CurrentDay>
            {(currentDay) => <Front db={database} currentDay={currentDay} />}
        </CurrentDay>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
