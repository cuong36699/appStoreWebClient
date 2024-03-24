import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5AV7OWQ6oz-zLj4obdO9lLc7atm_2GVs",
  authDomain: "web-store-project-e9a0f.firebaseapp.com",
  projectId: "web-store-project-e9a0f",
  storageBucket: "web-store-project-e9a0f.appspot.com",
  messagingSenderId: "860713444069",
  appId: "1:860713444069:web:c459c13285ae156476aa0c",
  measurementId: "G-FDS7H5L4PQ",
  databaseURL:
    "https://web-store-project-e9a0f-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
auth.appVerificationDisabledForTesting = true;
export { firestore, database, storage, auth };
