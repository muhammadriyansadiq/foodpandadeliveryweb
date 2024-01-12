
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {  getStorage, ref ,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getFirestore, addDoc ,collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyA4NpBdfho9N7hUZKRTpVnDdFFVxOa6jKw",
    authDomain: "bhabaklo.firebaseapp.com",
    projectId: "bhabaklo",
    storageBucket: "bhabaklo.appspot.com",
    messagingSenderId: "667627587420",
    appId: "1:667627587420:web:748c43666060d4518aa399" 
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage();
  const db = getFirestore(app);
let exampleInputEmail1 = document.getElementById("exampleInputEmail1")

let exampleInputPassword1 = document.getElementById("exampleInputPassword1")
let register = document.getElementById("register")



if(register){
register.addEventListener("click",function(){
  console.log("signup");
createUserWithEmailAndPassword(auth, exampleInputEmail1.value, exampleInputPassword1.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    location.href = "login.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log("errorcode",errorCode);
    console.log("errmsg",errorMessage);
  }); 
})
}