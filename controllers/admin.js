const pg = require('pg');
const config = require('../config');

var resUser = {};

const approveUser = (userUSN) => {
    const clientTrip = new pg.Client(config);
    const approveQuery = `UPDATE Stu_Per_Data SET status = 't' WHERE USN = '${userUSN.AId}'`;
    return new Promise((resolve, reject) => {
        clientTrip.connect()
        .then(() => 
            clientTrip.query(approveQuery)
                .then(res => {
                        resUser.AId=userUSN.AId;
                       
                })
                .catch(err => {
                    reject(err);
                    console.log(`Fetch error: ${err}`);
                })
                .then(async () => {
                    resolve(resUser.AId);
                    clientTrip.end();
                })
        )
        .catch(err => {
            reject(err);
            console.log(`Connection error: ${err}`);
        });
    });
}

const disapproveUser = (userUSN) => {
    const clientTrip = new pg.Client(config);
    const disapproveQuery = `UPDATE Stu_Per_Data SET Status = 'f' WHERE USN = '${userUSN.AId}'`;
    return new Promise((resolve, reject) => {
        clientTrip.connect()
        .then(() => 
            clientTrip.query(disapproveQuery)
                .then(res => {
                            resUser.AId=userUSN.AId;
                })
                .catch(err => {
                    reject(err);
                    console.log(`Fetch error: ${err}`);
                })
                .then(async () => {
                    resolve(resUser.AId);
                    clientTrip.end();
                })
        )
        .catch(err => {
            reject(err);
            console.log(`Connection error: ${err}`);
        });
    });
}

const blockUser = (userUSN) => {
    const clientTrip = new pg.Client(config);
    const disapproveQuery = `UPDATE Stu_Per_Data SET Status = 'f' WHERE name = '${userUSN.name}'`;
    return new Promise((resolve, reject) => {
        clientTrip.connect()
        .then(() => 
            clientTrip.query(disapproveQuery)
                .then(res => {
                            resUser.name=userUSN.name;
                })
                .catch(err => {
                    reject(err);
                    console.log(`Fetch error: ${err}`);
                })
                .then(async () => {
                    resolve(resUser.name);
                    clientTrip.end();
                })
        )
        .catch(err => {
            reject(err);
            console.log(`Connection error: ${err}`);
        });
    });
}


module.exports = { approveUser,disapproveUser,blockUser };