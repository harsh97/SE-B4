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

/**
 * Insert student details into database while registration
 * @param {JSON object containing student details} user
 * @returns Promise<boolean>
 */
const addStudent = (user) => {
    var client = new pg.Client(config);
    var addedStudent = false;
    return new Promise((resolve, reject) => {
        client.connect()
        .then(() => {
            var query = client.query(`INSERT INTO Stu_Per_Data (USN ,Name,Email, Parent_name, Par_Mobile_No, Mobile_No, latitude, longitude,password)
            VALUES ('${user.usn}','${user.name}', '${user.email}', '${user.parentName}', '${user.parentContact}', '${user.contact}',${user.latitude}, ${user.longitude}, 'braz');`)
                .then(() => {
                        addedStudent = true;
                        client.end();
                        resolve(addedStudent);
                })
                .catch(err => {
                    console.log(`Insertion error: ${err}`);
                    reject(err);
                });
        })
        .catch(err => {
            console.log(`Connection error: ${err}`);
            reject(err);
        });
    });
}

module.exports = { doesUSNExist, addStudent };