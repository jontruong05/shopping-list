// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvn3N-ZjF70_QQQLraaUULRvDjntUoMZ4",
  authDomain: "inventory-management-ea30c.firebaseapp.com",
  projectId: "inventory-management-ea30c",
  storageBucket: "inventory-management-ea30c.appspot.com",
  messagingSenderId: "272739530216",
  appId: "1:272739530216:web:fe244385e2035bdd95a05d",
  measurementId: "G-EX5665S9K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore} 