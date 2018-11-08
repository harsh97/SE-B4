const pg = require('pg');
const config = require('../config');

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

module.exports = getTrips;