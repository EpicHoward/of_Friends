function hash() {

    var hash_id = '__';
    var alph = ['y', 'o', 'z', 'a', 'p', 'b', 'q', 'c', 'r', 'd', 's',
        'e', 't', 'f', 'u', 'g', 'v', 'h', 'w', 'i', 'x', 'j', 'k', 'l', 'm', 'n'];
    var nums = [];

    for ( var i = 0; i < 10; i++ ) {

         nums.push( i );
    }

    while ( hash_id.length !== 14 ) {

          hash_id += alph[ Math.floor( Math.random()  * alph.length ) ];
          hash_id += nums[ Math.floor( Math.random()  * nums.length ) ];
    }

    return hash_id;
}

function includes( arr, item ) {

    for ( var i in arr ) {

         if ( arr[i] === item ) {

             return true;
         }
    }

    return false;
}


function filter( arr, callback ) {
    
    var newArray = [];
    for ( var i in arr ) {
        
        if ( callback( arr[i] ) ) {
            
            newArray.push( arr[i] );
        }
    }
    
    return newArray;
}

export default {
    includes: includes,
    hash: hash,
    filter: filter,
    getObjectValues: function( obj ) {
        
        var values = [];
        for ( var i in obj ) {
            
            values.push(obj[i]);
        }
        
        return values;
    }
};
