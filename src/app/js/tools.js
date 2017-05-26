function catchError( input, callback ) {
    
    var resp;
    switch ( input.type ) {
        case 'len':
            
            var err;
            for ( var i in input.data ) {
                
                if ( input.data[i].length === 0 ) {
                    
                    err = 1;
                }
            }
            
            if ( resp === 1 ) {
                
                resp = {
                    code: 0,
                    msg: 'Inputs lenght is zero.'
                };
            }
            break;
        
        case 'err':
            
            if ( input.err ) {
                
                resp = {
                    code: 0,
                    msg: input.err ? input.err : input.message
                };
            }
    }
    
    if ( resp !== undefined ) {
        
        return callback(resp);
    }
    
    return callback(null);
}