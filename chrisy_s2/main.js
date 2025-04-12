import { sendToThingChat } from "./crisyToThings.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
  import { sendToThingChat } from './crisyToThings.js';

  // use sendToThingChat(...) in your bot logic