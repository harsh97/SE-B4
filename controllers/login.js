const pg = require('pg');
const config = require('../config');

const sendMail = (email) => {
    
}

/**
 * Checks the availability of the USN during registration
 * @param {} usn 
 * @returns Promise<boolean> 
 */
const sendEmail =  (usn) => {
    var mailSent = false;
    const client = new pg.Client(config);
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                client.query(`SELECT Email FROM stu_per_data WHERE usn='${usn}';`)
                    .then( res => {
                        res.rows.forEach(row => {
                            console.log(row);
                            sendMail(row);
                            mailSent = true;
                        });
                    })
                    .catch(err => {
                        console.log(`Fetch error: ${err}`);
                        reject(err);
                    })
                    .then(() => {
                        client.end();
                        resolve(mailSent)
                    });
            })
            .catch(err => {
                console.log(`Connection error: ${err}`);
                reject(err);
            });
    });
}

module.exports = { sendEmail };