// styles
import './css/main.css';

// JavaScript files to include for the application
import auth from './js/auth.js';
import sendNewLetter from './js/send-newletter.js';

$(document).ready(function () {
    
    var user = {
        user_name: $('#user_name').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        newsLetterEmail: $('#newsLetterEmailInput').val(),
        donated: false
    };
    
    $('.siginUP').click(function() {
        
        auth.authUser( user.user_name, user.email, user.password, 'signUp' );
    });
    
    $('.logOut').click(function() {
        
        auth.logOut();
    });

    $('.signIn').click(function() {
        
        auth.signIn( undefined, user.email, user.password, 'signIn' );
    });
    
    $('#newsLetterEmailInput').keydown(function(k) {
        if ( k.which === 13 ) {
            
            sendNewLetter.addUser( user.email );
        }
    });
    
    $('#newsLetterEmailBtn').click(function() {
        
        sendNewLetter.addUser( user.email );
    });
});