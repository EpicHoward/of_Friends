// styles
import './css/main.css';

// JavaScript files to include for the application
import sendNewLetter from './js/newsletter.js';
import firebasedb from './js/firebase.js';
import newsfeed from './js/newsfeed.js';
import auth from './js/auth.js';


function app( firebaseUser ) {
    
    console.log( firebaseUser );
    
    $(document).ready(function() {
        $('#logout').click(function() {
            
            return firebasedb.auth().signOut();
        });
    });
}



const auth = firebasedb.auth();

firebasedb.auth().onAuthStateChanged(firebaseUser => {
    
    if ( firebaseUser ) {
        
        function getUser( usersObj, email ) {
            
            for ( var i in usersObj ) {
                
                if ( usersObj[ i ].email === email ) {
                    
                    return usersObj[ i ];
                }
                else {
                    
                    firebasedb.database().ref(`userdb/${  }`).set();
                    return 
                }
            }
        }
        
        console.log(`You are now logged in ${ firebaseUser.email }`);
        
        var firebaseUserEmail = firebaseUser.email;
        
        const dbRef = firebasedb.database().ref();
        
        
        dbRef.on('value', snap => {
          
            var usersdb = snap.val();
            
            var firebaseUser = getUser( usersdb, firebaseUserEmail, firebaseUserName );
        
            profile( firebaseUser );
        });
    }
    else {
        
        window.open('home.html', '_blank');
    }
});