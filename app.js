const express = require('express');
var index = require('./routes/signup');
const server = express();

server.set('PORT', 4001);

// Static pages which doesn't require Rest API calls. 
server.use(express.static('public'));
server.use(express.static('views'));

server.use('/', index);

server.get('/', (req, res, next) => {
    res.sendFile('index.html',{root: './views'});
});

server.listen(server.get('PORT'), () => {
    console.log(`Server is running at http://localhost:${server.get('PORT')} in ${server.get('env')} mode`);
});
