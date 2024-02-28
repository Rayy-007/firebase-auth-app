import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdE9Ew1wLuiXjooydxEtmb-fagvxFykPE",
  authDomain: "fir-auth-app-89675.firebaseapp.com",
  projectId: "fir-auth-app-89675",
  storageBucket: "fir-auth-app-89675.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
