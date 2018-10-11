const express = require('express');
const loginRouter = express.Router();
const validateLogin = require('../controllers/login');

/**
 * Router to handle login request
 * Request parameters => USN and Password
 * Response parameters => { user:name }
 */
loginRouter.post('/login', (req, res, next) => {
    validateLogin(req.body)
    .then(responseUser => {
        if(responseUser.name){
        res.render('UserProfile.html',{
            user:responseUser
        })
    }
    else
    {
        Exist= false;
        res.send(Exist).status(204);
    }
    })
    .catch(err => console.log(err));
});

module.exports = loginRouter ;