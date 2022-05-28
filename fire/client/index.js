import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3BvaWelZcGgcrFNFbRGKR4wWvqXOiEM8",
  authDomain: "findmyservice-d4f78.firebaseapp.com",
  projectId: "findmyservice-d4f78",
  storageBucket: "findmyservice-d4f78.appspot.com",
  messagingSenderId: "594802347980",
  appId: "1:594802347980:web:aabeaed0862a1299c99769"
};

const app = initializeApp(firebaseConfig);
// initialize client sdk
export const clientDB = getFirestore(app);
export const auth = getAuth(app);