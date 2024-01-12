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


let dishesadd;
let storedValue = localStorage.getItem("restaurantid");
let insertdishesdata = document.querySelector(".insertdishesdata")
console.log(storedValue);
let row = document.querySelector(".row")
let spinnerdishes = document.querySelector(".spinnerdishes")
let dishcarts = document.querySelector(".dishcarts")
let addtocartspinner = document.querySelector("#addtocartspinner")
let check = true;
// ======jitni dishes hai otnai product dkh jayyee
let getalllproducts = async () => {
    spinnerdishes.style.display = "block"
    const q = collection(db, "dishes")
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  if(doc.data().clas === storedValue ) {// restaurants id sai target kar k data fetch kiya hai
    // console.log("saylani"); 
dishesadd = `<span class="badge text-bg-warning">${doc.data().dishname}</span>`
console.log(dishesadd);
      console.log("dishesname", doc.data().dishname,"restaurants",doc.data().restaurantname);
  insertdishesdata.innerHTML += 
  `<div class="col-7">
  <div class="card w-100 mb-3">
      <div class="card-body rowstyling">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center justify-content-between">
              <img width="150" src="${doc.data().dishimage}" alt="">
          <div class="p-3">    
        <h5 class="card-title">${doc.data().dishname}</h5>
        <p class="card-text">serves ${doc.data().dishserving} persons</p>
      </div>
    </div>
    <span class="btn btnqty" onclick ="updateqty('-','${doc.data().id}')">-</span>
    <span id="${doc.data().id}">${doc.data().quantity} </span>
    <a href="#" class="btn btnqty" onclick ="updateqty('+','${doc.data().id}')">+</a>
    <a href="#" class="btn btn-orange" onclick ="addtocart('${doc.data().id}')">Add To Cart</a>
  </div>
</div>
    </div>
</div>
  `
  check =false
  dishcarts.style.display = "block"
  spinnerdishes.style.display = "none"
    }
    });
  };
  getalllproducts()


  // ==================if dishes are not available in restaurants============
setTimeout(()=>{
  if(check){
    Swal.fire("Dishes are not available right now");
  }
},2000)  

  // ============= selected restaurant ki details jo aap nai index sai vieall par click kiya tah
let getallldishes = async () => {
  const q = collection(db, "restaurants")
  const querySnapshot = await getDocs(q);
  //for inserting restaurant id in dishes in class form
  querySnapshot.forEach((doc) => {
if(doc.data().id ===storedValue ){
    console.log("dishes data",doc.data().id, " => ", doc.data());
    row.innerHTML += ` <div class="col-12">
    <div class="card w-100 mb-3 rowstyling">
      <div class="d-flex justify-content-center align-items-center">

        <div class="card-body">
          <img width="120" src="${doc.data().img}" alt="">
          <h5 class="card-title">${doc.data().name}</h5>
          <p class="card-text">${doc.data().address}</p>    
         ${dishesadd}
        </div>
        <div class = "socialmediaicons">
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-youtube"></i>
      </div>
    </div>
      </div>
      </div>`
}
  });
};

getallldishes()


// ==============+ - functionality
async function updateqty(type,id){
  
    let toupdateinsideqty = document.getElementById(id)
    console.log(toupdateinsideqty);
    if(+toupdateinsideqty.innerHTML >0){
  console.log(type);
    if(type === "+"){
let qty =+toupdateinsideqty.innerHTML
    qty += 1
    const washingtonRef = doc(db, "dishes", id);
        //for target unique id
        await updateDoc(washingtonRef, {
            quantity: qty,
        });

    }

    if(type === "-"){

        let qty =+toupdateinsideqty.innerHTML
            qty -= 1
            const washingtonRef = doc(db, "dishes", id);

                //for target unique id

                await updateDoc(washingtonRef, {
                    quantity: qty,
                });


            }

location.reload();
}
}



window.updateqty = updateqty;// q k isis js mai html banai hai

let selecteditems = document.getElementById("selecteditems")
let totalprice = document.getElementById("totalprice")
let docreftoupdatecart;
// =====================deletebtn addtocart functionality=================

selecteditems.addEventListener("click",async (e)=>{
  let geti = e.target.classList
  let getid = geti[3]
  console.log(getid);
  await deleteDoc(doc(db, "addtocart",getid));
  console.log("solved deleted");
  location.reload()
  })

// ================addtocart ki functionality================
async function addtocart(idd){ //dishes ki id arahai hai
  selecteditems.innerHTML= "";
  addtocartspinner.style.display = "block";
  // let getallldishes = async () => {
    const q = collection(db, "dishes")
    const querySnapshot = await getDocs(q);
    //for inserting restaurant id in dishes in class form
    querySnapshot.forEach(async(doc) => {
      if(doc.data().id === idd){
        docreftoupdatecart = await addDoc(collection(db, "addtocart"),doc.data());
        localStorage.setItem('docreftoupdatecart', docreftoupdatecart.id);
        console.log("addtocart",idd);
        updatedaddtocartdocument()
      }
    });

    // suddenly reload honai par database sai data get nhi kar raha tha dishes ka data takai addtocart mai save karwayee isliye async lagaya take thora waqt mil sakai need some time to fectching  data from database of dishes key data than reload and function called of addtocart
  setTimeout(()=>{
    addtocartspinner.style.display ="none"

    location.reload()

  },3000)

    }
    window.addtocart = addtocart;
// ============addtocart added id in addtocart data
async function updatedaddtocartdocument(){
let get =   localStorage.getItem('docreftoupdatecart');
console.log(get);
const washingtonRef = doc(db, "addtocart", get);
await updateDoc(washingtonRef, {
  addtocartid: washingtonRef.id
});
}


window.onload = async function () { // reload par wo tamam data dikhay jo addtocart hoi way ho
  const qq = collection(db, "addtocart")
  const qquerySnapshot = await getDocs(qq);
  qquerySnapshot.forEach(async(doc) => {
          selecteditems.innerHTML += `<div class="d-flex justify-content-between align-items-center w-100" id="${doc.data().addtocart}"><img width="100" src="${doc.data().dishimage}" alt="">
          <span class="qtyofitems">${doc.data().quantity}</span>
      <div class="p-3">    
    <span class="card-title">${doc.data().dishname}</span>
    <span class="card-text">Price <span id="itemprice">${doc.data().dishprice}</span> /plate</span>
  </div>
  <a href="#" class="btn btn-primary"><i  class="fa-solid fa-trash deleteicon ${doc.data().addtocartid}"></i></a></div>`
  totalprice.innerHTML = +totalprice.innerHTML  +  +`${+doc.data().quantity*+doc.data().dishprice}`
  })
}


// ===============order==============


let order = document.querySelector("#placeorder")
let closemodal = document.querySelector("#closemodal")
order.addEventListener("click",async function(){
  let exampleFormControlTextareaaddress = document.querySelector("#exampleFormControlTextareaaddress")
  let exampleFormControlInputnumber = document.querySelector("#exampleFormControlInputnumber")
  let exampleFormControlInputname = document.querySelector("#exampleFormControlInputname")
  console.log(exampleFormControlInputname.value,exampleFormControlInputnumber.value,exampleFormControlTextareaaddress.value);
  let arra = [exampleFormControlInputname.value,exampleFormControlInputnumber.value,exampleFormControlTextareaaddress.value]
  const qq = collection(db, "addtocart")// jitnai bbhi items buyed kiye hai wo ajjaye aur details orderanduserdetailsis ka zariye
  const qquerySnapshot = await getDocs(qq);
let arr = []
  qquerySnapshot.forEach(async(doc) => {
arr.push(doc.data())
console.log(doc.data());
  })
  const docRef = await addDoc(collection(db, "orderanduserdetails"), {
    itemsbuyed: arr,
    destination:arra,
    time:serverTimestamp(),
    status:"pending"
  });

  // ==============updatedocument=================

  const washingtonRef = doc(db, "orderanduserdetails",docRef.id );

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  orderanduserdetailsid: docRef.id
});
console.log(arr);



// ==========delete functionality start all carts remove after place order succesfully========================

const qqq = collection(db, "addtocart")
const qqquerySnapshot = await getDocs(qqq);
let arrr = []
qqquerySnapshot.forEach(async(doc) => {
console.log(doc.data().addtocartid);
arrr.push(doc.data().addtocartid)
})
arrr.forEach(async (data) =>{
  await deleteDoc(doc(db, "addtocart",data));
  console.log("delt");
})
console.log("finished");
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Order has been successfully placed",
  showConfirmButton: false,
  timer: 1500
})
closemodal.click();
console.log(arrr);
console.log("undelt");

setTimeout(()=>{//jab data delete nhi hota aur foran location reload hojati hai qk quickly synchronous code chalni ki waja sai is liye reload ko async diya hai
location.reload()
},3000)
})
// =====================deletebtn funcntionality==================




