import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBWZjzWdEWwczi_RDSLUCwMkjWT-ioiRlA",
    authDomain: "expenses-tracker-ce1d9.firebaseapp.com",
    databaseURL: "https://expenses-tracker-ce1d9-default-rtdb.firebaseio.com",
    projectId: "expenses-tracker-ce1d9",
    storageBucket: "expenses-tracker-ce1d9.appspot.com",
    messagingSenderId: "707831694152",
    appId: "1:707831694152:web:899ce391e69dbcbbaf297d",
    measurementId: "G-51DPY64Z2K"
  };

export const firebase_app = initializeApp(firebaseConfig);
export const db = getFirestore(firebase_app);

export const incomesRef = collection(db, 'incomes');
export const expensesRef = collection(db, 'expenses');

