// var db = require('./db.js');

exports.tab = (req, resp) => {
    
    const data = {
        page: req.params.page,
        url: req.url
    };
    
    switch ( data.url ) {
        
        case '/':
            
            data.comment = 'You made it to the home page, Welcome!';
            resp.json( data );
            break;
        case '/fund':
            
            data.comment = 'How much we talking here?'
            resp.json( data );
            break;
        
        default:
            resp.json( data );
            break;
    }
    
};

exports.search = (req, resp) => {
    
    var req_obj = {
        type: req.param('type') === '' ? 'global' : req.param('type'),
        query: req.params.query
    };
    
    resp.json( req_obj );
};