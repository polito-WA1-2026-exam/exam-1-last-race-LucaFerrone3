import agent from './setup.js';
import request from 'supertest';
import app from '../app.js';
import EventDAO from '../dao/event.js';
import { jest } from '@jest/globals';


describe('Get n events', () => {

    test('Get 4 events', async () => {
        const response = await agent.get('/api/events').query({ steps: 4 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(4);
        expect(response.body[0]).toEqual({
            event_id: expect.any(Number),
            description: expect.any(String),
            score: expect.any(Number),
        });

    });

    test('Get 200 events', async () => {
        const response = await agent.get('/api/events').query({ steps: 200 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(200);
        expect(response.body[0]).toEqual({
            event_id: expect.any(Number),
            description: expect.any(String),
            score: expect.any(Number),
        });

    });

    test('Invalid value for steps - negative', async () => {
        const response = await agent.get('/api/events').query({ steps: -200 });

        expect(response.status).toBe(400);

    });

    test('Invalid value for steps - zero', async () => {
        const response = await agent.get('/api/events').query({ steps: 0 });
        expect(response.status).toBe(400);

    });


    test('Invalid value for steps - string', async () => {
        const response = await agent.get('/api/events').query({ steps: 'string' });
        expect(response.status).toBe(400);

    });

    test('Unauthorized get events 401', async () => {

        const response = await request(app).get('/api/events').query({ steps: 4 });

        expect(response.status).toBe(401);

    });

    test('Should return 500 because EventDAO.getEvents() does not work', async () => {

        jest.spyOn(EventDAO, 'getEvents')
            .mockRejectedValue(new Error('Database unavailable'));


        const response = await agent.get('/api/events').query({ steps: 4 });

        expect(response.status).toBe(500);

    });

});