import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth"

const configuration = {
    apiKey: "AIzaSyDpcTlma_-kQQC60OcjOx8feVCmbEbfjls",
    authDomain: "study-buddy-6e857.firebaseapp.com",
    databaseURL: "https://study-buddy-6e857-default-rtdb.firebaseio.com",
    projectId: "study-buddy-6e857",
    storageBucket: "study-buddy-6e857.appspot.com",
    messagingSenderId: "46377915372",
    appId: "1:46377915372:web:4933add727124cb5daa6c9",
    measurementId: "G-8H7NV334DV"
}

firebase.initializeApp(configuration);

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth};