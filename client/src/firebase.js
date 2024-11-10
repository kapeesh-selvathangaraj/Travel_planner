// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//temporary souls firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZyg_1BAZRkiNaVt3bjwd4-3r5y_Zgwio",
  authDomain: "portfolio-e865f.firebaseapp.com",
  databaseURL: "https://portfolio-e865f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-e865f",
  storageBucket: "portfolio-e865f.appspot.com",
  messagingSenderId: "47482083783",
  appId: "1:47482083783:web:5e740eb6fccc2cc117e1e2",
  measurementId: "G-K5BMV6SKR4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
