const level = require('level');

const db = level('HSES_of_friends', { valueEncoding: 'json' });


exports.search = ( req_obj, callback ) => {
    
    db.get('db_obj', ( err, db_obj ) => {
        if (err) {
            console.log(`error: ${ err.message }`);
            return;
        }
        
        console.log( db_obj );
    })
};