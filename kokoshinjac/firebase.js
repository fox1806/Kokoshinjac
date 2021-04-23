import firebase from "firebase/app";

import "firebase/auth";

const firebaseConfig = {
    // unos podataka API-a
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export {
    auth
}