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
                    posts: {},
                    subscribed: 0
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
        
        console.log(`You are now logged in ${ firebaseUser.email }`);
        
        firebaseUser = firebaseUser.email;
        
        const dbRef = firebasedb.database().ref();
        
        dbRef.on('value', snap => {
          
            console.log( snap.val().alum )
        });
    }
    else {
        
        console.log('You are not logged in.');
    }
});

export default {
    logOut: firebasedb.auth().signOut(),
    authUser: authUser
};