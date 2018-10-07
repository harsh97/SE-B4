var express = require('express');

var existUSNRouter = express.Router();
const doesUSNExist = require('../controllers/signup');

existUSNRouter.get('/existUSN', (req, res, next) => {
    doesUSNExist(req.query.usn)
    .then(exist => {
        res.send({'exist':exist}).status(200);
    })
    .catch(err => console.log(err));
});

module.exports = existUSNRouter;