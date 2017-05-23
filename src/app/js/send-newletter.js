import firebasedb from './firebase.js';

function addUser( email ) {
    
    var emails = [ email ];
    firebasedb.database().ref('newsLetterList').set( emails )
}

export default addUser;