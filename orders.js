import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {  getStorage, ref ,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getFirestore, addDoc ,collection,serverTimestamp , query, where, getDocs,doc,updateDoc,deleteDoc  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// import  { uploadToStorage } from "./retaurant.js"
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
let customerorderaddress = document.querySelector("#Customerorderaddress")
let spinnerorders = document.querySelector("#spinnerorders")
let table = document.querySelector(".tableorders")
let counting =0
let closemodalbtn = document.querySelector("#closemodalbtn")
const querySnapshot = await getDocs(collection(db, "orderanduserdetails"));
querySnapshot.forEach((doc) => {
    spinnerorders.style.display = "block"
      counting += 1;
  console.log(doc.id, " => ", doc.data().destination)
  customerorderaddress.innerHTML += `<tr>
<th scope="row">${counting}</td>
<td>${doc.data().destination[0]}</td>
<td>${doc.data().destination[1]}</td>
<td>${doc.data().destination[2]}</td>
<td>${doc.data().status}</td>
<td>
<button type="button" class="btn btn-primary ${doc.data().orderanduserdetailsid} ordersbtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
  View details
</button>
</td>
</tr>`
spinnerorders.style.display = "none"
});

// ===========for getting user details ============

let viemodal = document.querySelector("#viemodal")

customerorderaddress.addEventListener("click",async (e)=>{
    let id = e.target.classList[2]
console.log(id);

const querySnapshot = await getDocs(collection(db, "orderanduserdetails"));
querySnapshot.forEach((doc) => {
if(doc.data().orderanduserdetailsid ===id){
    viemodal.innerHTML = `<div>
    <table>
    <tr>
    <td>logo</td>
    <td>dishname</td>
    <td>quantity</td>
    <td>amount</td>
    <td>Restaurant</td>
    </tr>
    <tr>
    <td><img width="70px" src="${doc.data().itemsbuyed[0].dishimage}" alt=""></td>
        <td>${doc.data().itemsbuyed[0].dishname}</td>
        <td>${doc.data().itemsbuyed[0].quantity}</td>
         <td>${Number(doc.data().itemsbuyed[0].quantity)*Number(doc.data().itemsbuyed[0].dishprice)}</td>
         <td>${doc.data().itemsbuyed[0].restaurantname}</td>
         </tr>
         </table>
         <select class="form-select ${doc.data().orderanduserdetailsid}" aria-label="Default select example">
  <option value="1">Pending</option>
  <option value="2">Delivered</option>
</select>
  </div>` 
    console.log(doc.data());
}
});
})

viemodal.addEventListener("click",async (e)=>{
 let targetedid = e.target.classList[1]
 console.log("id",targetedid);
    var selectElement = e.target;
    var selectedText = selectElement.options[selectElement.selectedIndex].text;
if(selectedText === "Delivered"){
    const washingtonRef = doc(db, "orderanduserdetails",targetedid);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
    status: "Delivered"
}); 

Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Order Delivered",
    showConfirmButton: false,
    timer: 1500
  });
  closemodalbtn.click();
  location.reload();
}
})



