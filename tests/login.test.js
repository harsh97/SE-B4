const express = require('express');
const loginRouter = require('../routes/login');
const request = require('supertest');

const initLogin = () => {
    const server = express();
    server.use(loginRouter);
    return server;
}

describe('GET /forgotPassword', () => {
    test('Send the email for a valid USN', async () => {
        const server = initLogin();
        var response = await request(server).get(`/forgotPassword?usn=01FB15ECS001`);
        expect(response.body).toEqual({
            sent:true
        });
    });
});
