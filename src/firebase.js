import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgm2V8r4a6_duJ0T-NDEh-w3xQZPS02FY",
  authDomain: "workoutapp-3f5a4.firebaseapp.com",
  projectId: "workoutapp-3f5a4",
  storageBucket: "workoutapp-3f5a4.appspot.com",
  messagingSenderId: "713918617790",
  appId: "1:713918617790:web:95156e39edcd66ba6e66ef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
