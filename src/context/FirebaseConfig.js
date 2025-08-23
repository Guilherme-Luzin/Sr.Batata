// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYCTkWV7MLZvrSLcwphMHPT7KoG_uz_L0",
  authDomain: "srabatata-76616.firebaseapp.com",
  projectId: "srabatata-76616",
  storageBucket: "srabatata-76616.firebasestorage.app",
  messagingSenderId: "804816281019",
  appId: "1:804816281019:web:782cbbaee63dd08146b89e",
  measurementId: "G-WZKF3TY4CF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);