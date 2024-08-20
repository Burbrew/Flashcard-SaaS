
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAczlb1CS3fKTPsQ_0BSTZgu-N30g1dXFo",
  authDomain: "flashcard-saas-387ab.firebaseapp.com",
  projectId: "flashcard-saas-387ab",
  storageBucket: "flashcard-saas-387ab.appspot.com",
  messagingSenderId: "9644927103",
  appId: "1:9644927103:web:111a40e402e6cfcb45b74a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };