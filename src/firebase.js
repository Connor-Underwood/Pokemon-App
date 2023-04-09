// Import the Firebase App module and necessary services
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Add your app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-G7EXDJLrQEHKVQ3TEljNL7PDpIDiLEQ",
  authDomain: "pokemon-app-57b73.firebaseapp.com",
  databaseURL: "https://pokemon-app-57b73-default-rtdb.firebaseio.com/",
  projectId: "pokemon-app-57b73",
  storageBucket: "pokemon-app-57b73.appspot.com",
  messagingSenderId: "760834558489",
  appId: "1:760834558489:web:6fcb60fb8b9b6f9e98b888"
};

// Initialize the Firebase SDK
const app = initializeApp(firebaseConfig);

// Get a Realtime Database instance
const database = getDatabase(app);


export { database};
