import {getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyChQ7T6GzEsp4Qm2cyV8AEpBoSoiIUJN2M",
  authDomain: "house-marketplace-a48ac.firebaseapp.com",
  projectId: "house-marketplace-a48ac",
  storageBucket: "house-marketplace-a48ac.appspot.com",
  messagingSenderId: "1039028045957",
  appId: "1:1039028045957:web:6b4f7310c4a71b15fa41ec"
};


const app = initializeApp(firebaseConfig);
export const db=getFirestore();