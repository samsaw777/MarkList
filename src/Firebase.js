import firebase from 'firebase/app'
import 'firebase/firestore'


export const firebaseConfig = firebase.initializeApp({
    apiKey: process.env.Firebase_API,
    authDomain: process.env.Firebase_Domain,
    projectId: process.env.Firebase_ID,
    storageBucket: process.env.Firebase_Bucket,
    messagingSenderId: process.env.SenderID,
    appId: process.env.AppID,
    measurementId: process.env.Firebase_MID
  });