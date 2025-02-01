// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1Sm6Z6XrEh7_qbqCmWxu9UtPUojKNZA0",
  authDomain: "polygon-1bcda.firebaseapp.com",
  projectId: "polygon-1bcda",
  storageBucket: "polygon-1bcda.firebasestorage.app",
  messagingSenderId: "244507649613",
  appId: "1:244507649613:web:5dffc3c6527a1752ab1e04",
  measurementId: "G-HDWRP7WJWB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
