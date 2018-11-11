const pg = require('pg');
const config = require('../config');

var resUser = {};

const approveUser = (userUSN) => {
    const clientTrip = new pg.Client(config);
    const approveQuery = `SELECT adminApproves('${userUSN.AId}');`;
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

const blockUser = (userUSN) => {
    const clientTrip = new pg.Client(config);
    const disapproveQuery = `UPDATE Stu_Per_Data SET Status = 'f' WHERE name = '${userUSN.AId}'`;
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

const getUsers =  (user) => {
    var users = [];
    const client = new pg.Client(config);
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                var usersQuery = `SELECT  usn as usn from Stu_per_data where status='f';`;
                client.query(usersQuery)
                    .then((res)=>{
                        res.rows.forEach(user1 => {
                            users.push(user1);
                        })
                        resolve(users);
                        client.end();
                        })
                        .catch(err => {
                            console.log(`Fetch error: ${err}`);
                            reject(err);
                        });
                })
                .catch(err => {
                   console.log(`Connection error: ${err}`);
                   reject(err);
               });
        }); 
}


const getBlockUsers =  (user) => {
    var users = [];
    const client = new pg.Client(config);
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                var usersQuery = `SELECT  name as name from Stu_per_data where status='t';`;
                client.query(usersQuery)
                    .then((res)=>{
                        res.rows.forEach(user1 => {
                            users.push(user1);
                        })
                        resolve(users);
                        client.end();
                        })
                        .catch(err => {
                            console.log(`Fetch error: ${err}`);
                            reject(err);
                        });
                })
                .catch(err => {
                   console.log(`Connection error: ${err}`);
                   reject(err);
               });
        }); 
}


const getTrips =  (user) => {
    var trips = [];
    const client = new pg.Client(config);
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
               var tripsQuery = `SELECT route_no as routeNumber, no_of_stu as noOfStudents, timing, bus_no as busNumber, driver.driver_name as driverName from trip, driver where driver.driver_id = trip.driver_id;`;
                client.query(tripsQuery)
                    .then((res)=>{
                        res.rows.forEach(trip => {
                            trips.push(trip);
                        })
                        resolve(trips);
                        client.end();
                        })
                
                    .catch(err => {
                        console.log(`Fetch error: ${err}`);
                        reject(err);
                    });
            })
            .catch(err => {
               console.log(`Connection error: ${err}`);
               reject(err);
           });
    });
}

module.exports = { approveUser, blockUser, getUsers, getTrips,getBlockUsers };
