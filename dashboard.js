import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";




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


onAuthStateChanged(auth, (user) => {

    if (user) {
        
        console.log(user.email);

if(user.email !== "admin@gmail.com"){

location.href = "login.html"
}
    }
     else {

        location.href = "login.html"

    }
  });


  // ============dashboard mai tamam restaurants ki details hogi==================


  