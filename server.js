var express = require('express'),
    app = express();

// used to able to send and recevie JSON objects to the beakend and frontend
var BodyParser = require('body-parser');
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// my modules
var routes = require('./lib/routes.js');


/*
    getting access to the files 
    in the current working directory
*/
app.use(express.static(`${__dirname}/app`));


// declaring the 'port' variable
var port = process.env.port || 8080;

// routes
app.get('/', routes.index);
app.get('/search/:query', routes.search);
// app.get('/:page', routes.tab);


app.listen(port, (req, resp) => {

    console.log(`running on ${ process.env.IP }:${ port }`);
});
