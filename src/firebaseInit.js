// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcks2i9fLBrYOPRCId9o3OTI9qUsA04MI",
  authDomain: "blogging-510e2.firebaseapp.com",
  projectId: "blogging-510e2",
  storageBucket: "blogging-510e2.appspot.com",
  messagingSenderId: "869510019728",
  appId: "1:869510019728:web:47dd047c94688d9de8b615"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app);