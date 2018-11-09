const express = require('express');
const adminRouter = express.Router();
const { approveUser, blockUser ,getUsers} = require('../controllers/admin');

adminRouter.get('/userList', (req, res, next) => {
    getUsers()
        .then(users => {
            if(users != null){
                res.send(users).status(200);
            }
            else
            {
                exist= false;
                res.send(exist).status(204);
            }
        })
        .catch(err => console.log(err));
});

adminRouter.post('/admin/:id', (req, res, next) => {
    if(req.params.id=="approve")
    {
        approveUser(req.body)
        .then(responseUser => {
            res.send({func:req.params.id ,Id:responseUser});
        })
        .catch(err => console.log(err));
    }
    if(req.params.id=="block")
    {
        blockUser(req.body)
        .then(responseUser => {
                    res.send({func:req.params.id ,Id:responseUser});
        })
        .catch(err => console.log(err));
    }
});

module.exports = adminRouter;