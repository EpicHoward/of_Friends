import firebasedb from './firebase.js';
import user, { profile } from './firebase.js';

// authentication JavaScript file

const auth = firebasedb.auth();

// login
function authUser( user_name, email, password, authMethod ) {
    
    if ( email.length !== 0 && password.length !== 0 ) {
        
        switch ( authMethod ) {
            
            case 'signUp':
                
                var promise = auth.createUserWithEmailAndPassword(email, password);
      
                promise.catch(e => console.log( e.message ) );
                
                firebasedb.database().ref('alum/' +  user_name ).set({
                    email: email,
                    image: false,
                    posts: {
                        'My frist job': {
                            views: 0,
                            content: '',
                            image: false,
                            date: false,
                            user_name: 'andre garvin'
                        }
                    },
                    subscribed: {
                        count: 1,
                        subscribers: {
                            'andre garvin': 'andregarvin718@gmail.com'
                        }
                    }
                })
                
                break;
            
            case 'logIn':
                
                var promise = auth.signInWithEmailAndPassword(email, password);
                
                promise.catch(e => console.log( e.message ) );
                break;
            
        }
    }
};


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
        
            console.log( firebaseUser );
        });
    }
    else {
        
        console.log('You are not logged in.');
    }
});

export default {
    logOut: function() {
        
        return firebasedb.auth().signOut();
    },
    authUser: authUser
};