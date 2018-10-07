const express = require('express');
const existUSNRouter = express.Router();
const registerRouter = express.Router();
const { doesUSNExist, addStudent } = require('../controllers/signup');

/**
 * Router to check if the USN has already registered.
 * Request parameters => USN
 * Response parameters => { exist : true/false }
 */
existUSNRouter.get('/existUSN', (req, res, next) => {
    doesUSNExist(req.query.usn)
    .then(exist => {
        res.send({'exist':exist}).status(200);
    })
    .catch(err => console.log(err));
});

registerRouter.post('/registerStudent', (req, res, next) => {
    console.log(req.query);
    addStudent(req.query)
    .then(exist => {
        res.send().status(200);
    })
    .catch(err => console.log(err));
});

module.exports = { existUSNRouter, registerRouter };