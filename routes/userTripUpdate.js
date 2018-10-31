const express = require('express');
const cancelTripRouter = express.Router();
const cancelTrip = require('./controllers/canceltrip');

/**
 * Router to handle login request
 * Request parameters => USN and tripId
 * Response parameters => { user:status }
 */
cancelTripRouter.put('/userTripUpdate', (req, res, next) => {
    alert('in routes canceltrip');
    console.log('IN routes controller');
    cancelTrip(req.body)
    .then(responseUser => {
        if(responseUser.name){
            res.render('UserProfile.html',{
                user:responseUser
            })
        }
        else
        {
            exist= false;
            res.send(exist).status(204);
        }
    })
    .catch(err => console.log(err));
});

module.exports = cancelTripRouter ;