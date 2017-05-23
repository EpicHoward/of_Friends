import './css/main.css';

// JavaScript files to include for the application
import auth from './js/auth.js';

auth.authUser('andre garvin', 'andregarvin718@gmail.com', 'andreGarvin', 'signUp');
$(document).ready(function () {
    
    $('.btn').click(function() {
        
        console.log('hello, world');
    });

//     $('#logout').hide();
//     $('#login').click(function() {
      
//         var email = $('#email').val();
//         var password = $('#password').val();
      
//         logInUser(email, password);
//     });
//     $('#signup').click(function() {
      
//         var email = $('#email').val();
//         var password = $('#password').val();
      
//         userSignUp(email, password);
//     });
//     $('#logout').click(function() {
        
//     });
});