// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2TcGWgRZQpj6RKdQabxKTGiETzSelfRk",
  authDomain: "react-journalapp-1208e.firebaseapp.com",
  projectId: "react-journalapp-1208e",
  storageBucket: "react-journalapp-1208e.appspot.com",
  messagingSenderId: "167963869486",
  appId: "1:167963869486:web:3001283514ed3022363abf"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth =  getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );