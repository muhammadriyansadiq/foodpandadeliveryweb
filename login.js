import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth,signInWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
const login = (e)=>{
    let email = document.querySelector("#email")
    let password = document.querySelector("#password")
console.log(email.value,password.value);
signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in horaha hai
    const user = userCredential.user;
    if(user.email === "admin@gmail.com"){
        location.href = "dashboard.html"
    }
console.log(user);
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error",errorMessage);
  });
}
let loginbtn = document.querySelector("#loginbtn")
loginbtn.addEventListener("click", login)
// ============agar admin nai login kiya haito dshboard walai page mai mve karjayee=================
