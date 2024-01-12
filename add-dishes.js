
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {  getStorage, ref ,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getFirestore, addDoc ,collection, query, where, getDocs,doc,updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
  let adddishes = document.getElementById("adddishes")


  const uploadToStorage = async (dishimage,dishnamevalue) => {
    return new Promise((resolve , reject) => {
      // const fileName = file.name;
      const storageRef = ref(storage, `dishes/${dishnamevalue.split(" ").join("-")}`);
      const uploadTask = uploadBytesResumable(storageRef, dishimage);//
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },   
        (error) => {
          console.log(error.message)
          console.log(error.code)
          reject(error);
        },
    
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          });
        }
      );
    });

    }

    // ============dishes=================

    let counting =0

    let getallldishes = async()=>{
    
      let alldishes = document.getElementById("alldishes")
          // restaurantlists.innerHTML = ""
          const q = (collection(db, "dishes"));
      const querySnapshot = await getDocs(q);
      // let restaurantlists = document.querySelector("#restaurant-list")
     
//for inserting restaurant id in dishes in class form


        querySnapshot.forEach((doc) => {  
      counting++
        console.log(doc.id, " => ", doc.data());
        alldishes.innerHTML  += `
        <tr id="${doc.data().id}">
        <th scope="row">${counting}</th>
        <td>  <img class="dishimg" src="${doc.data().dishimage}" alt=""></td>
        <td>${doc.data().dishname}</td>
        <td>Rs ${doc.data().dishprice}</td>
        <td>${doc.data().dishserving} Person</td>
        <td>${doc.data().restaurantname}</td>
      </tr>`
      });
      }
      getallldishes()
// ============restaurants ====================
let getalllrestaurants = async()=>{
let resselect = document.getElementById("restaurantname")
    // restaurantlists.innerHTML = ""
    const q = (collection(db, "restaurants"));
const querySnapshot = await getDocs(q);
// let restaurantlists = document.querySelector("#restaurant-list")
resselect.innerHTML  = `
  <option Selected>Select Restaurant</option>
  `
  querySnapshot.forEach((doc) => {  
// count += 1
  console.log(doc.id, " => ", doc.data());
  resselect.innerHTML  += `
  <option value="${doc.id}">${doc.data().name}</option>
  `
});
}
getalllrestaurants()
// ==================add dishes btn=================
adddishes.addEventListener("click",async function(){
let clas;
    let dishspinner = document.querySelector(".dishspinner")
    dishspinner.style.display = "block"
let restaurantname = document.querySelector("#restaurantname")
let dishname = document.querySelector("#dishname")
let dishprice = document.querySelector("#dishprice")
let dishserving = document.querySelector("#dishserving")
let dishimage = document.querySelector("#dishimage").files[0]
let closedishbtn = document.querySelector("#closedishbtn")
let dishnamevalue = dishname.value
let imgeurl = await uploadToStorage(dishimage,dishnamevalue)
let quantity =1
console.log(imgeurl);
var selectedOption = restaurantname.options[restaurantname.selectedIndex]
console.log("restaurant name",selectedOption.innerText);
// insert restaurants id in dishesdaata by restaurant name matching
const q = (collection(db, "restaurants"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {  
if(doc.data().name === selectedOption.innerText){
  clas = doc.data().id
  console.log("restaurants",clas);
}
})


let dishdetails = {
    restaurantname : selectedOption.innerText,
    dishname : dishname.value,
    dishprice : dishprice.value,
    dishserving : dishserving.value,
    dishimage : imgeurl,
    clas:clas,
    quantity:quantity
}
const docRef = await addDoc(collection(db, "dishes"),dishdetails);

const washingtonRef = doc(db, "dishes", docRef.id);
        //for target unique id
        await updateDoc(washingtonRef, {

          id: docRef.id,
          
        });

restaurantname.value = ""
dishname.value = ""
dishprice.value = ""
dishserving.value = ""
dishimage.value = ""
console.log(docRef);
dishspinner.style.display = "none"
closedishbtn.click();
})

// =========adddishes btn k click par tamam data dishes key ke name sai database mai store horaha hai image storage ki functionality bhi add kardi hai===============
