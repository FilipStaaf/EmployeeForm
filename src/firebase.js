
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClDq0eOFA1AJyMXeOjy_J8ST44VnRV3FI",
  authDomain: "employeeform-624e8.firebaseapp.com",
  databaseURL: "https://employeeform-624e8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "employeeform-624e8",
  storageBucket: "employeeform-624e8.appspot.com",
  messagingSenderId: "1020894042393",
  appId: "1:1020894042393:web:fe74175fb9431830f78d88"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;



/*
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebase from './firebase';

// Initialize Firebase
const app= initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db.database();
*/