const express = require('express');
var bodyParser = require('body-parser');
var signUp = require('./routes/signup');
var login = require('./routes/login');
const path=require('path');
const server = express();

server.set('PORT', 4002);
// Static pages which doesn't require Rest API calls. 
server.use(express.static('public'));
server.use(express.static('views'));
server.use(bodyParser.urlencoded({ extended: true }));

server.engine('.html',require('ejs').__express);
server.set('views',path.join(__dirname,'views/'));
server.set('view engine','html');

server.use('/', signUp);
server.use('/',login)

server.get('/', (req, res, next) => {
    res.sendFile('index.html',{root: './views'});
});

server.listen(server.get('PORT'), () => {
    console.log(`Server is running at http://localhost:${server.get('PORT')} in ${server.get('env')} mode`);
});
