import firebase from "firebase/app";

import "firebase/auth";

const firebaseConfig = {
    // unos podataka API-a
    apiKey: "AIzaSyDHXzbJXw6J5Hhxo5KZetYYnIBRbpEzXyg",
    authDomain: "kokoshinjac-ce239.firebaseapp.com",
    projectId: "kokoshinjac-ce239",
    storageBucket: "kokoshinjac-ce239.appspot.com",
    messagingSenderId: "350418679609",
    appId: "1:350418679609:web:fdf4bca0235cd873d4dae8"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export {
    auth
}
