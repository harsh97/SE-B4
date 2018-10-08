const pg = require('pg');
const config = require('../config');
// Or using SMTP Pool if you need to send a large amount of emails
const smtpPool = require('nodemailer-smtp-pool');
const nodemailer = require('nodemailer');
/**
 * Sends mail(password) to the given user mail account
 * @param {*} user 
 */
const sendMail = (user) => {
      var transporter = nodemailer.createTransport(smtpPool({
        service: 'gmail',
        auth: {
            user: 'testpesub4@gmail.com',
            pass: 'qmpzal123'
        },
        maxConnections: 5,
        maxMessages: 10
      }));
      var mailOptions = {
        from: 'testpesub4@gmail.com', 
        to: user.email,
        subject: 'Password Reset Request - TMS App',
        text: `Dear ${user.name} \n\n   Your password is ${user.password}. \n\n If you did not make this request, it is likely that another user has entered your USN by mistake and your account is still secure. \n\n Thanks & Regards,\n Team TMS`
      };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });  
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
                client.query(`SELECT name, Email, password FROM stu_per_data WHERE usn='${usn}';`)
                    .then( res => {
                        res.rows.forEach(row => {
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