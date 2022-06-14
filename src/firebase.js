import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxPkFU1za30sCC9W8Z3KHOHoN5v9fPkeQ",
    authDomain: "tipstore-92da8.firebaseapp.com",
    projectId: "tipstore-92da8",
    storageBucket: "tipstore-92da8.appspot.com",
    messagingSenderId: "302772174684",
    appId: "1:302772174684:web:a801f43add411bfefc8b99",
    measurementId: "G-57NG1B1TGB"
};


export const fire = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();