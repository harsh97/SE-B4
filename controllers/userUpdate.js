const pg = require('pg');
const config = require('../config');

/**
 * Cancels the trip for that  USN and tripId
 * @param user
 * @returns Promise<object> 
 */
const cancelTrip =  (user) => {
    var resStatus ={};
    const client = new pg.Client(config);
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                console.log(`in cancel trip`);
               var cancelQuery= `SELECT studentCancels('${user.usn}',${user.tripID});`;
                client.query(cancelQuery)
                    .then(()=>{ 
                        resStatus ={tripStatus: 0, tripID: user.tripID, action:"cancelTrip"}; //0 implying cancelled
                        client.end();
                        resolve(resStatus);
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


const changeAddress = (user) =>{
    var resStatus ={};
    const client = new pg.Client(config);
    return new Promise((resolve,reject) => {
        client.connect()
            .then(() => {
                console.log(`in controller`);
                var changeAddQuery =`SELECT locChanges('${user.usn}', ${user.tripID} , ${user.latitude}, ${user.longitude});` 
                console.log(`${changeAddQuery}`);
                client.query(changeAddQuery)
                    .then(() =>{
                        resStatus = {changeAddStatus:1 , tripID:user.tripID, action:"changeAddress"};
                        client.end();
                        resolve(resStatus);
                    })
                    .catch(err => {
                        console.log(`Fetch error : ${err}`);
                        reject(err);
                    });
            })
            .catch(err => {
                console.log(`Connection error: ${err}`);
                reject(err);
            });
    });
}


const changeTime = (user) =>{
    var resStatus ={};
    const client = new pg.Client(config);
    return new Promise((resolve,reject) => {
        client.connect()
            .then(() => {
                console.log(`In controller of change time`);
                var changeTimeQuery = `SELECT changeTime('${user.usn}', ${user.tripID}, '${user.timing}' );`
                console.log(`${changeTimeQuery}`);
                client.query(changeTimeQuery)
                    .then(() => {
                        resStatus = {changeTimeStatus:1 , tripID:user.tripID, action: "changeTime" };
                        client.end();
                        resolve(resStatus);
                    })
                    .catch(err => {
                        console.log( `Fetch error :${err}`);
                        reject(err);
                    });
            })
            .catch(err => {
                console.log(`Connection error: ${err}`);
                reject(err);
            });
    });
}
module.exports =  { cancelTrip, changeAddress , changeTime};