import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAGtfKbKKJoZAHG0GxhgV6sVimydozy1Ik",
  authDomain: "fhses-1fa2d.firebaseapp.com",
  databaseURL: "https://fhses-1fa2d.firebaseio.com",
  projectId: "fhses-1fa2d",
  storageBucket: "fhses-1fa2d.appspot.com",
  messagingSenderId: "404702936141"
};

firebase.initializeApp(config);

export default firebase;