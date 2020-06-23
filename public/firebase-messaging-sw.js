importScripts('https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.15.4/firebase-messaging.js')

const firebaseConfig = {
    apiKey: "AIzaSyAD-twvKmabdCGQINs6OEXZJHVi2ce-wLQ",
    authDomain: "needia-562bc.firebaseapp.com",
    databaseURL: "https://needia-562bc.firebaseio.com",
    projectId: "needia-562bc",
    storageBucket: "needia-562bc.appspot.com",
    messagingSenderId: "948254415377",
    appId: "1:948254415377:web:91fe7a296cc76835ad2fb0",
    measurementId: "G-ZLVWYBH3FE"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();