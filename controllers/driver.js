const pg = require('pg');
const config = require('../config');

const getRoutePointsById =  (driverId) => {
    var locations = [];
    const client = new pg.Client(config);
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                client.query(`select latitude, longitude from chan_loc where trip_id = (select trip_id from trip where driver_id = '${driverId}') UNION
                Select latitude, longitude from stu_trip_data where route_no = (select route_no from trip where driver_id='${driverId}');`)
                    .then( res => {
                        res.rows.forEach(row => {
                            locations.push(row);
                        });
                    })
                    .catch(err => {
                        console.log(`Fetch error: ${err}`);
                        reject(err);
                    })
                    .then(() => {
                        client.end();
                        resolve(locations)
                    });
            })
            .catch(err => {
                console.log(`Connection error: ${err}`);
                reject(err);
            });
    });
}

module.exports = { getRoutePointsById };