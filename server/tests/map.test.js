import agent from './setup.js';
import request from 'supertest';
import app from '../app.js';
import StationDAO from '../dao/station.js';
import ConnectionDAO from '../dao/connection.js';
import { jest } from '@jest/globals';


describe('GET /api/map', () => {

    test('should return 200', async () => {

        const response = await agent.get('/api/map');

        expect(response.status).toBe(200);
        
    });


    test('should return 500 because StationDAO.getStations() does not work', async () => {

        jest.spyOn(StationDAO, 'getStations')
            .mockRejectedValue(new Error('Database unavailable'));

        const response = await request(app)
            .get('/api/map');

        expect(response.status).toBe(500);


    });

    test('should return 500 because ConnectionDAO.getConnections() does not work', async () => {

        jest.spyOn(ConnectionDAO, 'getConnections')
            .mockRejectedValue(new Error('Database unavailable'));

        const response = await request(app)
            .get('/api/map');

        expect(response.status).toBe(500);


    });

});




