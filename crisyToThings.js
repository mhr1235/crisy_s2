
// crisyToThings.js
//import { initializeApp } from "firebase/app";
//import { getFirestore, collection, addDoc } from "firebase/firestore";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";


// Firebase config for "is-this-thing-on"
const firebaseConfig = {
  apiKey: "AIzaSyDOYJCXSpTzrIHxQ__EWz1kmeV25x04oZC",
  authDomain: "is-this-thing-on-320a7.firebaseapp.com",
  projectId: "is-this-thing-on-320a7",
  storageBucket: "is-this-thing-on-320a7.appspot.com",
  messagingSenderId: "895037288643",
  appId: "1:895037288643:web:ed6c9d98e20497d0dc6b276"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Sends a message to the "chat" collection used by is-this-thing-on.
 * @param {string} message - The message content (bot reply).
 * @param {string} username - Display name (e.g. "🎤CrisyVoiceBot").
 * @param {string} roomID - The room to send to (usually "chrisy").
 */
export async function sendToThingChat(message, username = "🎤CrisyVoiceBot", roomID = "chrisy") {
  try {
    await addDoc(collection(db, "chat"), {
      username,
      message,
      timestamp: Date.now(),
      roomID
    });
    console.log(`✅ Sent to Thing chat: ${message}`);
  } catch (err) {
    console.error("❌ Failed to send to Thing chat:", err);
  }
}
