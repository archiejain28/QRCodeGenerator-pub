// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBN-uad5XSNGeJw55Ok1FFCsVD6ezVmLO0",
  authDomain: "qrimage-96a02.firebaseapp.com",
  projectId: "qrimage-96a02",
  storageBucket: "qrimage-96a02.appspot.com",
  messagingSenderId: "59887867009",
  appId: "1:59887867009:web:dc558e7caff401e6b06980"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app)