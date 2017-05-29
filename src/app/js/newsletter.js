import sendGrid from 'sendgrid';
import firebasedb from './firebase.js';
import tools, { catchError } from './tools.js';

function addTodNewsLetter( email ) {
    
    firebasedb.database().ref(`newsLetterList`).set( email );
};

function sendNewsLetter( obj ) {
    
    function send_mail( recip, callback ) {
        
        varsendGrid( process.env.sendGridAPI_key );
        var helper = require('sendgrid').mail;
        
        
        var from_email = new helper.Email('noreply@FHSES.com');
        var to_email = new helper.Email( recip );
        var subject = 'My name is '+ obj.name +' and I am going to be a lum some day!!';
        var content = new helper.Content('text/plain', obj.mail);
        var mail = new helper.Mail(from_email, subject, to_email, content);
    
        var request = sendGrid.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });
    
        sendGrid.API(request, function(error, response) {
            if (response.statusCode) {
                return;
            }
            
            obj.recip = recip;
            return obj;
        });
    }
    
    var dbRfirebasedb.database().ref();
    var subscribers = snap.val();
    
    for ( var sub in subscribers ) {
        
        send_email(subscribers[sub], (letter) => {
            
            firebasedb.database().ref().set(`/usersdb/${ subscribers[sub] }/newsletters`).set( letter );
        });
    }
};

function subcribe( user_name, subscriber ) {
    
    var dbRef = firebasedb.database().ref('usersdb');
    
    dbRef.on('value', (snap) => {
        
        var users = snap.val();
        for ( var i in users ) {
             
            if ( users[i].type === 'alum' && users[i].user_name === user_name ) {
                 
                dbRef.set(`/usersdb/${ users[i].user_name }/subscribers`).set( subscrier );
            }
        }
    });
};



export default {
    addTodNewsLetter: addTodNewsLetter,
    sendNewsLetter: publishNewsLetter,
    subcribe: subcribe
};