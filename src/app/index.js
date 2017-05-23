// styles
import './css/main.css';

// JavaScript files to include for the application
import auth from './js/auth.js';
import sendNewLetter from './js/send-newletter.js';


$(document).ready(function () {
    
    $('.signUP').click(function() {
        
        auth.authUser( $('#user_name').val(), $('#email').val(), $('#password').val(), 'signUp' );
    });
    
    $('.logOut').click(function() {
        
        auth.logOut();
    });

    $('.signIn').click(function() {
        
        auth.authUser( undefined, $('#email').val(), $('#password').val(), 'signIn' );
    });
    
    $('#newsLetterEmailInput').keydown(function(k) {
        if ( k.which === 13 ) {
            
            console.log( $('#newsLetterEmailInput').val() );
        }
    });
    
    $('#newsLetterEmailBtn').click(function() {
        
        console.log( $('#newsLetterEmailInput').val() );
    });
});