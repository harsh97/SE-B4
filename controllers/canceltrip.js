const pg = require('pg');
const config = require('../config');

/**
 * Cancels the trip for that  USN and tripId
 * @param user
 * @returns Promise<object> 
 */
const cancelTrip =  (user) => {
    var resStatus ={};
    const client = new pg.Client(config)
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                var cancelQuery= `SELECT studentCancels ('$user.usn'), ${user.tripId});`;
                client.query(cancelQuery)
                    .then(()=>{ resStatus.tripStatus = 0; //0 implying cancelled
                        })
                
                    .catch(err => {
                        console.log(`Fetch error: ${err}`);
                        reject(err);
                    })
                    .then(() => {
                        client.end();
                        resolve(resUser);
                    });
            })
            .catch(err => {
               console.log(`Connection error: ${err}`);
               reject(err);
           });
    });
}
module.exports = cancelTrip;