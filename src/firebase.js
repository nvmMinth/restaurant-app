import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC_ep6v1XVNDeJ1XGNcQNsArfU7stNs1ik",
    authDomain: "e-restaurant-de7f8.firebaseapp.com",
    databaseURL: "https://e-restaurant-de7f8-default-rtdb.firebaseio.com",
    projectId: "e-restaurant-de7f8",
    storageBucket: "e-restaurant-de7f8.appspot.com",
    messagingSenderId: "497771019972",
    appId: "1:497771019972:web:d7feac6604d824ccd21391"
};


const firebaseApp = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const database = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp)

const auth = getAuth(firebaseApp);

export { firebaseApp, database, storage, auth };