// styles
import './css/main.css';

// JavaScript files to include for the application
import firebasedb import './js/firebase.js';
import newsLetter, { addTodNewsLetter } from './js/newsletter.js';


$(document).ready(function () {
    
    $('#newsLetterEmailInput').keydown(function(k) {
        if ( k.which === 13 ) {
            
            console.log( $('#newsLetterEmailInput').val() );
        }
    });
    
    $('#newsLetterEmailBtn').click(function() {
        
        console.log( $('#newsLetterEmailInput').val() );
    });
});