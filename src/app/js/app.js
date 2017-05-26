import sendNewsLetter from './newsletter.js';
import auth, { logOut } from './auth.js';
import newsfeed from './newsfeed.js';


function profile( firebaseUser ) {
    
    console.log( firebaseUser );
};

export default { profile: profile };