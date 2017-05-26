import firebasedb from './firebase.js';
import tools, { catchError } from './tools.js';

function addTodNewsLetter( user_name, email ) {
    
    firebasedb.database().ref(`newsLetterList/${ user_name }`).set( email );
};

export default {
    addTodNewsLetter: addTodNewsLetter,
    // publishNewsLetter: publishNewsLetter,
    // unsubribe: unsubcribe,
    // subcribe: subcribe
};