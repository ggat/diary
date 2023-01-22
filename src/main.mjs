// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
const db = getFirestore(app);

console.log('start adding a document...');
const docRef = await addDoc(collection(db, "users"), {
  first: "Ada",
  last: "Lovelace",
  born: 1815
});
console.log('document added.');