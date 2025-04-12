// main.js

import { sendToThingChat } from './crisyToThings.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

// Define bot API endpoints and styles
const cachedBotReplies = {};
const botAPIEndpoints = {
  chatbot1: 'https://mhr1235.github.io/gpt2_simple_data/chatbot1.json',
  chatbot2: 'https://mhr1235.github.io/gpt2_simple_data/chatbot2.json',
  chatbot3: 'https://mhr1235.github.io/gpt2_simple_data/chatbot4.json',
  chatbot4: 'https://mhr1235.github.io/gpt2_simple_data/chatbot3.json'
};

const botStyles = {
  chatbot1: { color: '#ffaa00', label: '🧙🏾‍♂️ SwardspeakBot', font: "'Press Start 2P', monospace", trigger: 'sword speak bot' },
  chatbot2: { color: '#ccff66 ', label: '👨‍🦰 LeatherBot', font: "'Anton', sans-serif", trigger: 'leather bot' },
  chatbot3: { color: '#ff66cc', label: '💃🌽 ShowgirlBot', font: "'Playfair Display', serif", trigger: 'showgirlbot' },
  chatbot4: { color: '#66ccff', label: '👴🏾 ManongBot', font: 'Lucida Console, monospace', trigger: 'chatbot 4' }
};

// Floating GIF bot highlight updater
function updateFloatingBotGif(botKey) {
  const botIndexMap = { chatbot1: 0, chatbot2: 1, chatbot3: 2 };
  const indexToTurnOn = botIndexMap[botKey];
  _floating_images.forEach((imgObj, i) => {
    imgObj.element.src = i === indexToTurnOn && _images_on[i] ? _images_on[i] : _images[i];
    imgObj.element.style.zIndex = i === indexToTurnOn ? '5' : '2';
  });
}

// Chat event
const input = document.getElementById('chatInput');
input.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter' && input.value.trim() !== '') {
    const text = input.value.trim();
    const botKey = document.getElementById('botSelector').value;
    const chatMessages = document.getElementById('chatMessages');

    const userMsg = document.createElement('div');
    userMsg.textContent = 'You: ' + text;
    userMsg.style.color = '#00ffd5';
    chatMessages.appendChild(userMsg);
    input.value = '';

    try {
      if (!cachedBotReplies[botKey]) {
        const res = await fetch(botAPIEndpoints[botKey]);
        const json = await res.json();
        cachedBotReplies[botKey] = json;
      }
      const replies = cachedBotReplies[botKey].texts;
      if (!replies || replies.length === 0) return;

      const index = Math.floor(Math.random() * replies.length);
      const randomReply = replies.splice(index, 1)[0];
      const botStyle = botStyles[botKey];

      const typingMsg = document.createElement('div');
      typingMsg.textContent = `${botStyle.label} is typing...`;
      typingMsg.style.color = 'gray';
      chatMessages.appendChild(typingMsg);

      const delay = Math.floor(Math.random() * 800) + 400;
      setTimeout(() => {
        typingMsg.textContent = `${botStyle.label}: ${randomReply}`;
        typingMsg.style.color = botStyle.color;
        typingMsg.style.fontFamily = botStyle.font;
        sendToThingChat(randomReply, botStyle.label, 'chrisy');
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, delay);

    } catch (err) {
      const errMsg = document.createElement('div');
      errMsg.textContent = 'Error: ' + err;
      errMsg.style.color = 'red';
      chatMessages.appendChild(errMsg);
    }
  }
});

// Auto-select bot and floating GIFs
window.addEventListener('DOMContentLoaded', () => {
  const botKeys = Object.keys(botStyles).filter(b => b !== 'chatbot4');
  const randomBot = botKeys[Math.floor(Math.random() * botKeys.length)];
  const botSelector = document.getElementById('botSelector');
  botSelector.value = randomBot;
  updateFloatingBotGif(randomBot);

  const msg = document.createElement('div');
  msg.textContent = `🤖 Randomly selected: ${botStyles[randomBot].label}`;
  msg.style.color = 'yellow';
  document.getElementById('chatMessages').appendChild(msg);
});
