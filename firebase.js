import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEMhNROThE_oT-o459f2a1klCKfT97l0U",
  authDomain: "whatapp-2-cc429.firebaseapp.com",
  projectId: "whatapp-2-cc429",
  storageBucket: "whatapp-2-cc429.appspot.com",
  messagingSenderId: "732379374938",
  appId: "1:732379374938:web:8447ae3b8a2d4613d5bf63"
};
initializeApp(firebaseConfig)


const db = getFirestore();
const auth = getAuth();
const provider  = new GoogleAuthProvider()

export {db, auth, provider};