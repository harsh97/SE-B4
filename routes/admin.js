const express = require('express');
const adminRouter = express.Router();
const getTrips = require('../controllers/admin');

/**
 * Router to handle login request
 * Request parameters => USN and tripId
 * Response parameters => { user:status }
 */
adminRouter.get('/tripList', (req, res, next) => {
   getTrips()
    .then(trips => {
        if(trips != null){
            // res.render('admin/trips.html')
            res.send(trips).status(200);
        }
        else
        {
            exist= false;
            res.send(exist).status(204);
        }
    })
    .catch(err => console.log(err));
});

module.exports = adminRouter ;