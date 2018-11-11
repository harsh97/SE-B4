const express = require('express');
const signUpRouter = express.Router();
const { doesUSNExist, addStudent } = require('../controllers/signup');

/**
 * Router to check if the USN has already registered.
 * Request parameters => USN
 * Response parameters => { exist : true/false }
 */
signUpRouter.get('/existUSN', (req, res, next) => {
    doesUSNExist(req.query.usn)
    .then(exist => {
        res.send({'exist':exist}).status(200);
    })
    .catch(err => {
        console.log(err)
        res.send().status(503);
    });
});

/**
 * Router to add the student who register into the database
 */
signUpRouter.post('/registerStudent', (req, res, next) => {
    addStudent(req.body)
    .then(added => {
        res.send({'inserted': added}).status(201);
    })
    .catch(err => {
        console.log(err)
        res.send().status(503);
    });
});

module.exports = signUpRouter ;