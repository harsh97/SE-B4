var pg = require('pg');
var config = require('../config');

/**
 * Checks the availability of the USN during registration
 * @param {USN of the student} usn 
 * @returns Promise<boolean> 
 */
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
                        console.log(`Fetch error: ${err}`);
                        reject(err);
                    })
                    .then(() => {
                        client.end();
                        resolve(usnExist)
                    });
            })
            .catch(err => {
                console.log(`Connection error: ${err}`);
                reject(err);
            });
    });
}

const addStudent = (user) => {
    var client = new pg.Client(config);
    console.log(user);
    return new Promise((resolve, reject) => {
        resolve('exist');
    });
}

module.exports = { doesUSNExist, addStudent };