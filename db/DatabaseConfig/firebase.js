// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; // Cloud firestore 데이터가져오기
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDyUnyKfijSbsAviNPriBAXO2PmAIm8E3w",
  authDomain: "mate-charlie-13cb9.firebaseapp.com",
  projectId: "mate-charlie-13cb9",
  storageBucket: "mate-charlie-13cb9.appspot.com",
  messagingSenderId: "790146142926",
  appId: "1:790146142926:web:fed6533ca67fc6a4f3769f",
  measurementId: "G-J1MEBYCPG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);