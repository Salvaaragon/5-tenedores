import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "XXXXXXXXXX",
    authDomain: "XXXXXXXXXX",
    databaseURL: "XXXXXXXXXX",
    projectId: "XXXXXXXXXX",
    storageBucket: "XXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXX",
    appId: "XXXXXXXXXX"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
