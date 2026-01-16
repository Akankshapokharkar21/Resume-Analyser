import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCljpHQ_cNB7wxVBD91ciuDr_QRRCiqctw",
  authDomain: "mernai-f65d8.firebaseapp.com",
  projectId: "mernai-f65d8",
  storageBucket: "mernai-f65d8.firebasestorage.app",
  messagingSenderId: "776426239772",
  appId: "1:776426239772:web:ac63286722aa09c9a06cd9",
  measurementId: "G-TSK8P1MDKR"
};

const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const provider=new GoogleAuthProvider();
export {auth,provider};