const express = require('express');
const adminRouter = require('../routes/admin');
const request = require('supertest');

const initAdmin = () => {
    const server = express();
    server.use(adminRouter);
    return server;
}

describe('GET /userList', () => {
    test('Return the list of users who has not been approved', async () => {
        const server = initAdmin();
        var response = await request(server).get(`/userList`)
        .expect(200);
    });
});

describe('GET /tripList', () => {
    test('Return the list of ongoing trips', async () => {
        const server = initAdmin();
        var response = await request(server).get(`/tripList`)
        .expect(200);
    });
});