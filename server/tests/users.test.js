import agent from './setup.js';
import request from 'supertest';
import app from '../app.js';
import UserDAO from '../dao/user.js';
import { jest } from '@jest/globals';
import db from '../database/db.js';
import passport from "passport";
import http from 'http';

afterEach(async () => {
    await new Promise((resolve, reject) => {
        db.run(
            'DELETE FROM Users WHERE email=?',
            ['test@test.it'],
            err => err ? reject(err) : resolve()
        );
    });
});

describe('Create account', () => {

    test('POST /api/users/register 201', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                email: 'test@test.it',
                password: 'password123'
            });

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            user_id: expect.any(Number),
            email: 'test@test.it'
        });

    });


    test('POST /api/users/register 409', async () => {
        const response_new_user = await request(app)
            .post('/api/users/register')
            .send({
                email: 'test@test.it',
                password: 'password123'
            });

        expect(response_new_user.status).toBe(201);

        const response_alredy_registered_user = await request(app)
            .post('/api/users/register')
            .send({
                email: 'test@test.it',
                password: 'password123'
            });

        expect(response_alredy_registered_user.status).toBe(409);
    });

    test('should return 500 because UserDAO.createUser() does not work', async () => {

        jest.spyOn(UserDAO, 'createUser')
            .mockRejectedValue(new Error('Database unavailable'));

        const response = await request(app)
            .post('/api/users/register')
            .send({
                email: 'test@test.it',
                password: 'password123'
            });

        expect(response.status).toBe(500);


    });

});



describe('Login ', () => {

    test('POST /api/users/login 201', async () => {

        const response_new_user = await request(app)
            .post('/api/users/register')
            .send({
                email: 'test@test.it',
                password: 'password123'
            });

        expect(response_new_user.status).toBe(201);

        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@test.it',
                password: 'password123'
            });

        expect(response.status).toBe(200);


        expect(response.body).toEqual({
            user_id: expect.any(Number),
            email: 'test@test.it'
        });
    });


    test('POST /api/users/login 400 - Invalid credentials', async () => {

        const response_new_user = await request(app)
            .post('/api/users/register')
            .send({
                email: 'test@test.it',
                password: 'password123'
            });

        expect(response_new_user.status).toBe(201);

        const response_password_wrong = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@test.it',
                password: 'password1234'
            });

        expect(response_password_wrong.status).toBe(400);

        const response_email_wrong = await request(app)
            .post('/api/users/login')
            .send({
                email: 'tests@test.it',
                password: 'password123'
            });

        expect(response_email_wrong.status).toBe(400);
    });

    test('should return 500 because UserDAO.getUser() does not work', async () => {

        const response_new_user = await request(app)
            .post('/api/users/register')
            .send({
                email: 'test@test.it',
                password: 'password123'
            });

        expect(response_new_user.status).toBe(201);

        jest.spyOn(UserDAO, 'getUser').mockRejectedValue(new Error('Database unavailable'));

        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@test.it',
                password: 'password123'
            });

        expect(response.status).toBe(500);


    });

});





describe('Logout', () => {

    test('POST /api/users/logout 200', async () => {
        const logoutAgent = request.agent(app);

        await logoutAgent
            .post('/api/users/login')
            .send({
                email: "admin@studenti.polito.it",
                password : "root"
            });


        const response = await logoutAgent.post('/api/users/logout');

        expect(response.status).toBe(200);

    });


    test('POST /api/users/logout 401 - unauthorized', async () => {

        const response = await request.agent(app).post('/api/users/logout');

        expect(response.status).toBe(401);
    });


});





