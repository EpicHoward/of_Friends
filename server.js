var express = require('express'),
    app = express();

// used to able to send and recevie JSON objects to the beakend and frontend
var BodyParser = require('body-parser');
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// my modules
const routes = require('./lib/routes.js'); // holds all the routes for the backend 


/*
    getting access to the files 
    in the current working directory
*/
// app.use(express.static(`${__dirname}/dist`));


// declaring the 'port' variable
var port = process.env.port || 8080;

// routes
app.get('/', routes.tab);
app.get('/:page', routes.tab);


app.listen(port, (req, resp) => {

    console.log(`running on ${ process.env.IP }:${ port }`);
});
