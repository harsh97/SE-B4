const express = require('express');
const signUpRouter = require('../routes/signup');
const request = require('supertest');
const bodyParser = require('body-parser');

const initSignUp = () => {
    const server = express();
    server.use(signUpRouter);
    server.use(bodyParser.urlencoded({ extended: true }));
    return server;
}

describe('GET /existUSN', () => {
    test('Check if the existing USN returns true', async () => {
        const server = initSignUp();
        var response = await request(server).get(`/existUSN?usn=01FB15ECS001`);
        expect(response.body).toEqual({
            exist:true
        });
    });
    test('Check if the non-existing USN returns false', async () => {
        const server = initSignUp();
        var response = await request(server).get(`/existUSN?usn=01FB15ECS1119`);
        expect(response.body).toEqual({
            exist:false
        });
    });
});

// describe('POST /registerStudent', () => {
//     test('Successful registration', async () => {
//         const server = initSignUp();
        
//         var response = await request(server)
//         .post('/registerStudent')
//         .type('form')
//         .send(
//             {
//             name: 'GRV',
//             usn: '01FB15ECS1111',
//             email: 'grv@gmail.com',
//             contact: 9999999999,
//             parentName: 'GRV',
//             parentContact: 9999999999,
//             latitude: 12.456,
//             longitude: 15.789  
//         })
//         // .set('Accept', /application\/json/)
//         .expect(201)
//         .end(function (err, res) { done(); });
//     });
// });