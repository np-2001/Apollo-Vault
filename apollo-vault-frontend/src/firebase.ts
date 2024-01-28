import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';


var firebaseConfig = {
    
    apiKey: "AIzaSyAo735B8K8eGF3MUZPBlO0rtxa7fsWYyxs",
    authDomain: "apollo-vault.firebaseapp.com",
    databaseURL: "https://apollo-vault-default-rtdb.firebaseio.com",
    projectId: "apollo-vault",
    storageBucket: "apollo-vault.appspot.com",
    messagingSenderId: "540005183553",
    appId: "1:540005183553:web:5b4d641a0f35110609d6c0",
    measurementId: "G-L5PF8T3WGJ"

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const databaseRef = ref(database);


export { database };

