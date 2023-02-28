import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzgO5rT9EYNOVf3mqYUWUCR91RoloIyEY",
  authDomain: "airbnb-1d391.firebaseapp.com",
  projectId: "airbnb-1d391",
  storageBucket: "airbnb-1d391.appspot.com",
  messagingSenderId: "419422521519",
  appId: "1:419422521519:web:cfb44d114885559c43ac5a",
  measurementId: "G-ZHHE699ZE3",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider, db };
