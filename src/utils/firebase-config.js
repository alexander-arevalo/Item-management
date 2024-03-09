import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAE5Hu07mj97yzqVev6XjNDM3_nuNCzgzM",
  authDomain: "practical-test-5145d.firebaseapp.com",
  databaseURL: "https://practical-test-5145d-default-rtdb.firebaseio.com",
  projectId: "practical-test-5145d",
  storageBucket: "practical-test-5145d.appspot.com",
  messagingSenderId: "851345817626",
  appId: "1:851345817626:web:a5912add6d1be5b84111a3",
  measurementId: "G-KKBWGHZBV7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };
