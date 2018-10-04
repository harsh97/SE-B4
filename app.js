const express = require('express');
const server = express();

server.set('PORT', 4001);

var index = require('./routes/index');

// Static pages which doesn't require Rest API calls. 
server.use(express.static('public'));
server.use(express.static('views'));

server.listen(server.get('PORT'), () => {
    console.log(`Server is running at http://localhost:${server.get('PORT')} in ${server.get('env')} mode`);
});

server.get('/', (req, res, next) => {
    res.sendFile('index.html',{root: './views'});
});

server.use('/',index.loginRouter);