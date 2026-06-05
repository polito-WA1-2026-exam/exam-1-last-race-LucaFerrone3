import request from 'supertest';
import app from '../app.js';
import { jest } from '@jest/globals';

const agent = request.agent(app);

beforeAll(async () => {
    await agent
        .post('/api/users/login')
        .send({
            username: "admin@studenti.polito.it",
            password : "root"
        });
});

afterEach(() => {
    jest.restoreAllMocks();
});

export default agent;