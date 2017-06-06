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
                first_name: user_name.split(' ')[0],
                last_name: user_name.split(' ')[user_name.split(' ').length - 1],
                email: userObj.email,
                employement: "",
                bio: ""
           },
           subscribers: {
                "andre garvin" : "andre.garvin@envirostudies.org"
           },
           posts: "",
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
        if ( tool.includes(Object.keys( users ), userObj.user_name) ) {

            return callback(null, users[ userObj.user_name ]);
        }
        else {

            return callback(null, createUser( userObj ));
        }
    });
};


function searchdb( obj, callback ) {

    const db = firebase.database();
    var resp;
    switch ( obj.type ) {
      
        case 'users':
        
            db.ref('usersdb').on('value', (snap) => {
            
                var users = snap.val();
                var data = tool.filter(tool.getObjectValues( users ), (i) => {
                
                    return i.profile.user_name.slice(0, obj.query.length) === obj.query;
                });
                
                data = data.map((i) => {
                    
                    return {
                        user_name: i.profile.user_name,
                        profile_pic: i.profile.profilePic,
                        hash_tags: i.profile.hash_tags,
                        type: i.meta.type
                    };
                });
                resp = callback(null, data);
            })
            break;
        
        case 'events':
        
            db.ref('newsfeed').on('value', (snap) => {
            
                var events = snap.val();
                var data = tool.filter(tool.getObjectValues( events ), (i) => {
                
                    return i.type === 'event' && i.title.slice(0, obj.query.length) === obj.query;
                });
            
                resp = callback(null, data);
            })
            break;
        
        case 'groups':
        
            db.ref('groups').on('value', (snap) => {
            
                var groups = snap.val();
                var data = tool.filter(Object.keys( groups ), (i) => {
                
                    return i.group_name.slice(0, obj.query.length) === obj.query;
                });
            
                resp = callback(null, data);
            })
            break;
    
        case 'posts':
        
            db.ref('newsfeed').on('value', (snap) => {
            
                var users = snap.val();
                var data = tool.filter(tool.getObjectValues( users ), (i) => {
                
                    return i.title.slice(0, obj.query.length) === obj.query;
                    // || tool.includes(i.hash_tags, obj.query)
                });
            
                resp = callback(null, data);
            })
            break;
      
        default:
        
            resp = callback({
                status: false,
                msg: `No results were found for ${ obj.query }`
            }, undefined);
            break;
    }
    
    return resp;
}


export default {
    firebase: firebase,
    getUser: getUser,
    saveTo: function(db_path, input) {

          try {

              firebase.database().ref(db_path).set(input);
              return firebase.database().ref(db_path);
          }
          catch (err) {

              console.log(err.message);
          }
    },
    searchdb: searchdb
};
