var pg = require('pg');
var config = require('../config');

const doesUSNExist =  (usn) => {
    var usnExist = false;
    var client = new pg.Client(config);
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                var query = client.query(`SELECT name FROM stu_per_data WHERE usn='${usn}';`)
                    .then( res => {
                        res.rows.forEach(row => {
                            usnExist = true;
                        });
                    })
                    .catch(err => {
                        console.log("Fetch error: " + err);
                        reject(err);
                    })
                    .then(() => {
                        client.end();
                        resolve(usnExist)
                    });
            })
            .catch(err => {
                console.log("Connection error: " + err);
                reject(err);
            });
    });
}

module.exports = doesUSNExist;