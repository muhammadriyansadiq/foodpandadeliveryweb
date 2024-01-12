let selectedlogo = document.querySelector("#selected-logo")
let logorestaurantinput = document.querySelector("#logorestaurantinput")
let file;
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {  getStorage, ref ,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getFirestore, addDoc ,collection, query, where, getDocs,doc,updateDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
  let url;
  let restaurantlists = document.querySelector("#restaurant-list")

//   ================imagestoration===========================

  const uploadToStorage = async (file,restaurantname) => {
      return new Promise((resolve , reject) => {
        const fileName = file.name;
        const storageRef = ref(storage, `images/${restaurantname.split(" ").join("-")}`);
        const uploadTask = uploadBytesResumable(storageRef, file);//
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
     let count = 0 

let getalllrestaurants = async()=>{
    restaurantlists.innerHTML = ""
    const q = (collection(db, "restaurants"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {  
count += 1
  console.log(doc.id, " => ", doc.data());
  restaurantlists.innerHTML  += `   
  <tr>  
  <th scope="row">${count}</th>
  <td><img class="restaurant-logo-img" src="${doc.data().img}" alt=""></td>
  <td>${doc.data().name}</td>
  <td>${doc.data().address}</td>
</tr>`
});
}
getalllrestaurants()
let showImage;

if(logorestaurantinput){
logorestaurantinput.addEventListener("change",function(e){
    file = e.target.files[0]
    console.log(file);
    selectedlogo.style.display = "block";
    let selectedlogoo = URL.createObjectURL(file)
    console.log(selectedlogoo)
    localStorage.setItem('key', selectedlogoo);
    var src = localStorage.getItem('key');
    selectedlogo.src = src
})
}
let submitrestaurant = document.querySelector("#submitrestaurant")
let btnsecondary = document.querySelector(".btn-secondary") 
if(submitrestaurant){
submitrestaurant.addEventListener("click",async ()=>{
    let spinnerborder = document.querySelector(".spinner-border")
    let restaurantname = document.querySelector("#restaurant-name")
    let restaurantadress = document.querySelector("#restaurant-adress")
console.log(restaurantname.value,restaurantadress.value,file);
        const filed  = document.querySelector("#logorestaurantinput")
        ;//input file
        spinnerborder.style.display = "block"
         showImage = document.querySelector("#selected-logo");// insert in img tag
        console.log("for checking file",filed,"file",file);
       url = await uploadToStorage(file,restaurantname.value);//call function file.files[0] ki jaga file hai q k already value save karai hoi hai
        console.log("url: " + url);
        localStorage.setItem("Image" ,(url));
const docRef = await addDoc(collection(db, "restaurants"), {
    name: restaurantname.value,
    address: restaurantadress.value,
    img:url
  });

  const washingtonRef = doc(db, "restaurants", docRef.id);
        //for target unique id
        await updateDoc(washingtonRef, {

          id: docRef.id,
          
        });
  console.log("Document written with ID: ", docRef.id);
  spinnerborder.style.display = "none"
  restaurantname.value = ""
  restaurantadress.value = ""
  filed.value = "";
  showImage.style.display = "none"
  btnsecondary.click()
  getalllrestaurants()
})
}
// restaurant mai sab sai pehlai tu add newrestaurany k click par modal khul raha hai aursubmit restaurant btn k click par tamam data data base mai add hoga aur image storage ki functionality bhi lagayi hoi hai