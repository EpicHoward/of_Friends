import app, { profile } from '../index.js';
import firebasedb from './firebase.js';

// authentication JavaScript file
const auth = firebasedb.auth();

firebasedb.auth().onAuthStateChanged(firebaseUser => {
    
    if ( firebaseUser ) {
        
        function getUser( usersObj, email ) {
            
            for ( var i in usersObj ) {
                
                if ( usersObj[ i ].email === email ) {
                    
                    return usersObj[ i ];
                }
            }
        }
        
        console.log(`You are now logged in ${ firebaseUser.email }`);
        
        var firebaseUserEmail = firebaseUser.email;
        
        const dbRef = firebasedb.database().ref();
        
        
        dbRef.on('value', snap => {
          
            var usersdb = snap.val();
            
            var firebaseUser = getUser( usersdb.alum, firebaseUserEmail );
        
            profile( firebaseUser );
        });
    }
    else {
        
        window.open('home.html', '_blank');
    }
});

export default {
    logOut: function() {
        
        return firebasedb.auth().signOut();
    }
};