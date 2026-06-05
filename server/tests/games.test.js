import agent from './setup.js';
import request from 'supertest';
import app from '../app.js';
import GameDAO from '../dao/game.js';
import { jest } from '@jest/globals';
import db from '../database/db.js';
import {user, testAgent, testAgentEmail} from './setup.js';

afterEach(async () => {
    await db.run(
        'DELETE FROM Games WHERE user_id = (SELECT user_id FROM Users WHERE email = ?);',
        [testAgentEmail]
    );
});

describe('GET /api/games', () => {

    test('Get results list', async () => {
        const response = await agent.get('/api/games');

        
        const result = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) AS count FROM Games WHERE user_id = ?',
                [user.user_id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(result.count);
        expect(response.body[0]).toEqual({
            game_id: expect.any(Number),
            start_station: expect.any(String),
            destination_station: expect.any(String),
            score: expect.any(Number),
            won: expect.any(Boolean),
            played_at: expect.any(String),
        });

    });

    test('Unauthorized get events 401', async () => {

        const response = await request(app).get('/api/games');

        expect(response.status).toBe(401);

    });

    test('Should return 500 because GameDAO.getResultsById() does not work', async () => {

        jest.spyOn(GameDAO, 'getResultsById')
            .mockRejectedValue(new Error('Database unavailable'));


        const response = await agent.get('/api/games');
        expect(response.status).toBe(500);

    });

});


describe('POST /api/games/result', () => {

    test('Add new result', async () => {
        const response = await testAgent.post('/api/games/result').send({
            start_station_id: 1,
            destination_station_id: 14,
            score: 15,
            won: true,
            played_at: '2026-05-26 13:15:00',
        });
        expect(response.status).toBe(201); 

        expect(response.body).toEqual({
            game_id: expect.any(Number),
            start_station: expect.any(String),
            destination_station: expect.any(String),
            score: expect.any(Number),
            won: expect.any(Boolean),
            played_at: expect.any(String),
        });

    });

    test('Add new result - invalid start_station_id', async () => {
        const response = await testAgent.post('/api/games/result').send({
            start_station_id: -1,
            destination_station_id: 14,
            score: 15,
            won: true,
            played_at: '2026-05-26 13:15:00',
        });
        expect(response.status).toBe(400);
    });

    test('Add new result - invalid destination_station_id', async () => {
        const response = await testAgent.post('/api/games/result').send({
            start_station_id: 1,
            destination_station_id: -1,
            score: 15,
            won: true,
            played_at: '2026-05-26 13:15:00',
        });
        expect(response.status).toBe(400);
    });

    test('Add new result - not existing destination_station_id - 500', async () => {
        const response = await testAgent.post('/api/games/result').send({
            start_station_id: 1,
            destination_station_id: 0,
            score: 15,
            won: true,
            played_at: '2026-05-26 13:15:00',
        });
        expect(response.status).toBe(500);
    });


    test('Add new result - negative score', async () => {
        const response = await testAgent.post('/api/games/result').send({
            start_station_id: 1,
            destination_station_id: 14,
            score: -5,
            won: true,
            played_at: '2026-05-26 13:15:00',
        });
        expect(response.status).toBe(400);
    });

    test('Add new result - zero score', async () => {
        const response = await testAgent.post('/api/games/result').send({
            start_station_id: 1,
            destination_station_id: 14,
            score: 0,
            won: true,
            played_at: '2026-05-26 13:15:00',
        });
        expect(response.status).toBe(201);
    });


    test('Unauthorized', async () => {
        const response = await request(app).post('/api/games/result').send({
            start_station_id: 1,
            destination_station_id: 14,
            score: 15,
            won: true,
            played_at: '2026-05-26 13:15:00',
        });
        expect(response.status).toBe(401); 

    });

    test('Should return 500 because GameDAO.createGame() does not work', async () => {

        jest.spyOn(GameDAO, 'createGame')
            .mockRejectedValue(new Error('Database unavailable'));


        const response = await testAgent.post('/api/games/result').send({
            start_station_id: 1,
            destination_station_id: 14,
            score: 15,
            won: true,
            played_at: '2026-05-26 13:15:00',
        });
        expect(response.status).toBe(500);

    });

});