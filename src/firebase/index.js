import firebase from 'firebase/app'
import 'firebase/messaging'

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

// const firebaseConfig = {
//   apiKey: "AIzaSyATaIQJ_SSb4EhBBUjXG5SGjRWP5Poiv9c",
//   authDomain: "laravel-fcm-3b14a.firebaseapp.com",
//   databaseURL: "https://laravel-fcm-3b14a.firebaseio.com",
//   projectId: "laravel-fcm-3b14a",
//   storageBucket: "laravel-fcm-3b14a.appspot.com",
//   messagingSenderId: "298639679227",
//   appId: "1:298639679227:web:cb250b5c85482382b99a5e",
//   measurementId: "G-P24K3EYJ2K"
// };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export default messaging

// messaging.requestPermission().then(function(){
//     console.log('have permission')
//     return messaging.getToken()
// }).then(function(token){
//     console.log(token)
// })
// .catch(function(err){
//     console.log(err)
// })


// messaging.onMessage(function(payload){
//     console.log('onMessage', payload)
// })