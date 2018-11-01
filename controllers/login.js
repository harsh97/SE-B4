
const pg = require('pg');
const config = require('../config');

/**
 * Checks the availability of the USN during registration
 * @param user
 * @returns Promise<object> 
 */
const validateLogin =  (user) => {
    var resUser ={};
    return new Promise((resolve, reject) => {
        if(user.id == 'admin') {
            if(user.AId == 'admin' && user.pass == 'admin') {
                resUser = {id: user.id, validAdmin:true};
                resolve(resUser);
            }
            else {
                reject(new Error('Authentication failed'));
            }
        }
        else {
            const client = new pg.Client(config)
            client.connect()
                .then(() => {
                    var userQuery;
                    var response;
                    if(user.id == 'student') {
                        userQuery = `SELECT name FROM stu_per_data WHERE usn='${user.usn}'AND password='${user.pass}';`;
                        response = 'name';
                        resUser = {id: user.id, usn: user.usn};
                    }
                    else if(user.id == 'driver') {
                        userQuery = `SELECT driver_name FROM driver WHERE driver_id=${user.dId} AND password='${user.pass}';`;
                        response = 'driver_name';
                        resUser = {id:user.id, dId:user.dId};
                    }   
                    client.query(userQuery)
                        .then( res => {
                                res.rows.forEach(row => {
                                    resUser.name = row[response];
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
        }
    });
}
module.exports = validateLogin;