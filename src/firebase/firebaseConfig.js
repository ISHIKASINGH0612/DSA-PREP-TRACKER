// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAO9Coce9Xbp1eui1msE3zuCRVxtnR-r78",
//   authDomain: "dsa-prep-tracker.firebaseapp.com",
//   projectId: "dsa-prep-tracker",
//   storageBucket: "dsa-prep-tracker.firebasestorage.app",
//   messagingSenderId: "153541034800",
//   appId: "1:153541034800:web:f98c8a5a95c4e428b4bef5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO9Coce9Xbp1eui1msE3zuCRVxtnR-r78",
  authDomain: "dsa-prep-tracker.firebaseapp.com",
  projectId: "dsa-prep-tracker",
  storageBucket: "dsa-prep-tracker.firebasestorage.app",
  messagingSenderId: "153541034800",
  appId: "1:153541034800:web:f98c8a5a95c4e428b4bef5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
