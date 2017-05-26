// styles
import './css/main.css';

// JavaScript files to include for the application
import sendNewLetter from './js/newsletter.js';
import newsfeed from './js/newsfeed.js';
import auth from './js/auth.js';


function profile( firebaseUser ) {
    
    console.log( firebaseUser );
};

export default { profile: profile };