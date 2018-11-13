// getRoutePointsById
const express = require('express');
const driverRouter = express.Router();
const { getRoutePointsById } = require('../controllers/driver');

driverRouter.get('/getRoutePointsById', (req, res, next) => {
    getRoutePointsById(req.query.id)
    .then(locations => {
        res.send(locations).status(200);
    })
    .catch(err => {
        console.log(err)
        res.send().status(503);
    });
});


module.exports = driverRouter ;