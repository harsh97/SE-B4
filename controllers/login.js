const pg = require('pg');
const config = require('../config');

/**
 * Checks the availability of the USN during registration
 * @param user
 * @returns Promise<object> 
 */
const validateLogin =  (user) => {
    var resUser ={};
    const client = new pg.Client(config)
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                client.query(`SELECT name FROM stu_per_data WHERE usn='${user.usn}'AND password='${user.pass}';`)
                    .then( res => {
                            res.rows.forEach(row => {
                                sname = row.name;
                                resUser={name: sname, usn:user.usn};
                        });
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
module.exports = validateLogin;