import * as firebase from 'firebase';
import tool from './tools';

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

const date = new Date();
function createUser( userObj ) {

    var user_name = userObj.user_name.toLowerCase();
    var newUser = {
           profile: {
                profilePic: "",
                user_name: user_name,
                first_name: user_name.toLowerCase().split(' ')[0],
                last_name: user_name.toLowerCase().split(' ')[user_name.toLowerCase().split(' ').length - 1],
                email: userObj.email,
                employement: "",
                bio: ""
           },
           subscribers: {
                "andre garvin" : "andre.garvin@envirostudies.org"
           },
           posts: false,
           meta: {
                active: "pending",
                address: "",
                phone_number: "",
                type: "",
                joined: `${ date.getMonth() }/${ date.getDate() }'/${ date.getFullYear() }`,
          }
   };

   firebase.database().ref(`usersdb/${ user_name }`).set( newUser );
   return newUser;
}

function getUser( userObj, callback ) {

    const usersdb = firebase.database().ref('usersdb');
    usersdb.on('value', (snap) => {

        var users = snap.val();
        if ( tool.includes(Object.keys( users ), userObj.user_name.toLowerCase()) ) {

            return callback(null, users[ userObj.user_name.toLowerCase() ]);
        }
        else {

            return callback(null, createUser( userObj ));
        }
    });
};


export default {
    firebase: firebase,
    getUser: getUser,
    saveTo: function(db_path, input) {

          try {

              input.date = `${ date.getMonth() + 1 }/${ date.getDate() }'/${ date.getFullYear() }`;
              firebase.database().ref(db_path).set(input);

              return firebase.database().ref(db_path);
          }
          catch (err) {

              console.log(err.message);
          }
    },
    // getFrom: getFrom,
};
