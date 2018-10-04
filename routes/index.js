var express = require('express');
var loginRouter = express.Router();

/**
 * RESTful API(POST) for Login Feature
 */
loginRouter.post('/login/:id', (req, res, next) => {
    console.log(req.params.id);
    res.send().status(200);
});


module.exports = { loginRouter };