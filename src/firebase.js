// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//   apiKey: "AIzaSyC0oB7MXszmUqfOXSAeWzpTJJsgBhYP_Jk",
//   authDomain: "interviewform-23f8f.firebaseapp.com",
//   projectId: "interviewform-23f8f",
//   storageBucket: "interviewform-23f8f.appspot.com",
//   messagingSenderId: "1077679148009",
//   appId: "1:1077679148009:web:17add8c22866eaaf53d978",
//   measurementId: "G-THNS06EXW9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/database';
import 'firebase/auth';
const firebaseConfig = {

  apiKey: "AIzaSyC0oB7MXszmUqfOXSAeWzpTJJsgBhYP_Jk",
  authDomain: "interviewform-23f8f.firebaseapp.com",
  databaseURL: "https://interviewform-23f8f-default-rtdb.firebaseio.com/",
  projectId: "interviewform-23f8f",
  storageBucket: "interviewform-23f8f.appspot.com",
  messagingSenderId: "1077679148009",
  appId: "1:1077679148009:web:17add8c22866eaaf53d978",
  measurementId: "G-THNS06EXW9"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;

