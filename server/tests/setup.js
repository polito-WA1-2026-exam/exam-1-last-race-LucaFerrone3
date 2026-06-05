import request from 'supertest';
import app from '../app.js';
import { afterAll, jest } from '@jest/globals';
import db from '../database/db.js';

const agent = request.agent(app);
export const testAgent = request.agent(app);


export const user = {
    "user_id": 1,
    "email" : "admin@studenti.polito.it",
    "password" : "root"
}

export const testAgentEmail = 'testAgent@test.it';

beforeAll(async () => {
    await agent
        .post('/api/users/login')
        .send({
            email: "admin@studenti.polito.it",
            password : "root"
        });

    await testAgent.post('/api/users/register')
            .send({
                email: 'testAgent@test.it',
                password: 'password123'
            });

    await testAgent
        .post('/api/users/login')
        .send({
            email: 'testAgent@test.it',
                password: 'password123'
        });
});

afterEach(() => {
    jest.restoreAllMocks();
});


afterAll(async () => {
    await db.run(
        'DELETE FROM Users WHERE email = ?',
        [testAgentEmail]
    );
});

export default agent;


