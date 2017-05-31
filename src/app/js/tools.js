function includes( arr, item ) {

    for ( var i in arr ) {

         if ( arr[i] === item ) {

             return true;
         }
    }

    return false;
}

export default {
    includes: includes
};
