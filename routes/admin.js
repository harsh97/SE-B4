const express = require('express');
const adminRouter = express.Router();
const { approveUser, disapproveUser } = require('../controllers/admin');

adminRouter.post('/admin/:id', (req, res, next) => {
    if(req.params.id=="approve")
    {
    approveUser(req.body)
    .then(responseUser => {
        
                res.send({'func':req.params.id ,'Id':responseUser.AId});
    })
    .catch(err => console.log(err));
}
if(req.params.id=="disapprove")
{
    disapproveUser(req.body)
    .then(responseUser => {
        
                res.send({'func':req.params.id ,'Id':responseUser.AId});
    })
    .catch(err => console.log(err));

}
if(req.params.id=="block")
{
    blockUser(req.body)
    .then(responseUser => {
        
                res.send({'func':req.params.id ,'Id':responseUser.AId});
    })
    .catch(err => console.log(err));

}
});

module.exports = adminRouter;