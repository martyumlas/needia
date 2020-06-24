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