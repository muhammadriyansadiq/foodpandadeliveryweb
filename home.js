import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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

let row = document.querySelector(".row")
let spinnerborders = document.querySelector(".spinnerborders")
let getalllrestaurants = async()=>{
    row.innerHTML = ""
    spinnerborders.style.display = "block"
    const q = (collection(db, "restaurants"));
const querySnapshot = await getDocs(q);

// let restaurantlists = document.querySelector("#restaurant-list")

querySnapshot.forEach((doc) => {  
// count += 1
  console.log(doc.id, " => ", doc.data());
  row.innerHTML  += 
  ` <div id="${doc.data().id}" class="col">
  <div class="card" style="width: 18rem;">
      <img class="indeximg" src="${doc.data().img}" alt="...">
      <div class="card-body">
        <h5 class="card-title">${doc.data().name}</h5>
        <p class="card-text">All varities available</p>
        <p><span class="badge text-bg-warning">Biryani</span>
          <span class="badge text-bg-warning">karhai</span>
          <span class="badge text-bg-warning">Tikkah</span>
      </p>
        <a href="/dishes.html" class="gosomewherebtn">View All Items</a>
      </div>
    </div>
</div>`
});
spinnerborders.style.display = "none"
}
getalllrestaurants()


// =================home k page par woo data show horaha hai jo restaurants ka hai jo k database mai save hai view all items k click karnnai par dishes k page par move karjayega page aur dishes ka page os restaurants ki all dishes dikhayega==============


// =========view all tn k click par page move karna hai aur restaurant id get ki os sai dishes wali page mai data fetch kiya ============

row.addEventListener("click",(e)=>{
e.preventDefault()
let togettargetedid = e.target.parentNode.parentNode.parentNode.id
localStorage.setItem('restaurantid', togettargetedid);
console.log(togettargetedid);
location.href = "dishes.html"
})

