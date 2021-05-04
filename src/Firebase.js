import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseapp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_Firebase_API,
    authDomain: process.env.REACT_APP_Firebase_Domain,
    databaseURL: process.env.REACT_APP_Firebase_DatabaseURL,
    projectId: process.env.REACT_APP_Firebase_ID,
    storageBucket: process.env.REACT_APP_Firebase_Bucket,
    messagingSenderId: process.env.REACT_APP_SenderID,
    appId: process.env.REACT_APP_AppID,
    measurementId: process.env.REACT_APP_Firebase_MID
  });


  const db = firebaseapp.firestore()
  export {db}
//   firebase.analytics();