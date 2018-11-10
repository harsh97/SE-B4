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
    //var action = req.params.id
    // if(req.params.id== "cancelTrip"){
        console.log('currently working in cancel trip');
        cancelTrip(req.body)
        .then(responseUser => {
            console.log('cancel trip executed');
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
    console.log('Change Address request received');
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
    console.log(`Change Time request recived`);
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
//module.exports = changeAddRouter ;