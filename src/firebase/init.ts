// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getDatabase, ref} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwYaAe3u5wB9Oy-Uj8k__Q_yq8RKcd5D4",
    authDomain: "simplechat-7ea90.firebaseapp.com",
    databaseURL: "https://simplechat-7ea90-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "simplechat-7ea90",
    storageBucket: "simplechat-7ea90.appspot.com",
    messagingSenderId: "323333188826",
    appId: "1:323333188826:web:8120ffff5c6e42dcce89e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export ref of database
const db = getDatabase(app);
export const messagesRef = ref(db, 'v2/messages/');
