import firebase from "firebase/app";

import "firebase/auth";
import 'firebase/firestore'

const firebaseConfig = {
    // unos podataka API-a
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()


const jaja = db.collection('jaja');
const hrana = db.collection('hrana');
const users = db.collection('korisnici');

export {
    db,
    auth,
    jaja,
    hrana,
    users
}
