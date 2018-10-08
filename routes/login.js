const express = require('express');
const loginRouter = express.Router();
const { sendEmail } = require('../controllers/login');

/**
 * Router to check if the USN has already registered.
 * Request parameters => USN
 * Response parameters => { exist : true/false }
 */
loginRouter.get('/forgotPassword', (req, res, next) => {
    sendEmail(req.query.usn)
    .then(exist => {
        res.send({'exist':exist}).status(200);
    })
    .catch(err => console.log(err));
});

module.exports = loginRouter;