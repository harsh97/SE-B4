const express = require('express');
const cancelTripRouter = express.Router();
const cancelTrip = require('../controllers/cancelTrip');

/**
 * Router to handle login request
 * Request parameters => USN and tripId
 * Response parameters => { user:status }
 */
cancelTripRouter.put('/userTripUpdate', (req, res, next) => {
    
    //console.log(`IN routes controller`+ JSON.stringify(req.body) );
   // cancelTrip(JSON.stringify(req.body))
   cancelTrip(req.body)
    .then(responseUser => {
        if(responseUser.tripStatus==0){
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