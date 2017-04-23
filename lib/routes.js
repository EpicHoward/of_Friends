// var db = require('./db.js');

exports.index = (req, resp) => {
    
    resp.sendFile(`${ __dirname }/app/index.html`);
};

exports.tab = (req, resp) => {
    
    var tab = req.params.page;
    
    switch ( tab ) {
        
        case 'about':
            
            resp.sendFile(`${ __dirname }/app/about.html`);
            break;
        case 'fund':
            
            resp.sendFile(`${ __dirname }/app/fund.html`);
            break;
        case 'alumnis':
            
            resp.sendFile(`${ __dirname }/app/index.html`);
            break;
        case 'contact':
            
            resp.sendFile(`${ __dirname }/app/contact.html`);
            break;
        default:
            
            resp.sendFile(`${ __dirname }/app/404.html`);
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