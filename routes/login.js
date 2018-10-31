const express = require('express');
const loginRouter = express.Router();
const validateLogin = require('../controllers/login');

/**
 * Router to handle login request
 * Request parameters => USN and Password
 * Response parameters => { user:name }
 */
loginRouter.post('/login/:id', (req, res, next) => {
    validateLogin(req.body)
    .then(responseUser => {
        if(responseUser.name){
            if(responseUser.id=="student")
            {
        res.render('UserProfile.html',{
            user:responseUser
        })
            }
            if(responseUser.id=="driver")
            {
        res.render('driver/driverui.html',{
            user:responseUser
        },true)
            }

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