const express = require('express');
const userTripRouter = express.Router();
//const changeAddRouter = express.Router();
const { cancelTrip, changeAddress, changeTime } = require('../controllers/userUpdate');

/**
 * Router to handle login request
 * Request parameters => USN and tripId
 * Response parameters => { user:status }
 */
userTripRouter.put('/cancelTrip', (req, res, next) => {
        cancelTrip(req.body)
        .then(responseUser => {
            if(responseUser.tripStatus==0){
                res.send(responseUser)
            }
            else
            {
                exist= false;
                res.send(exist).status(204);
            }
        })
        .catch(err => console.log(err));
    
})

userTripRouter.put('/changeAddress', (req, res, next) => {
    changeAddress(req.body)
    .then(responseUser =>{
        if(responseUser.changeAddStatus==1){
            res.send(responseUser)
        }
        else{
            exist = false;
            res.send(exist).status(204);
        }
    })
    .catch (err => console.log(err));
});


userTripRouter.put('/changeTime', (req,res,next) => {
    changeTime(req.body)
    .then(responseUser => {
        if(responseUser.changeTimeStatus ==1){
            res.send(responseUser)
        }
        else{
            exist =false;
            res.send(exist).status(204);
        }
    })
    .catch (err => console.log(err));
});
module.exports = userTripRouter ;
