import agent from './setup.js';
import request from 'supertest';
import app from '../app.js';
import StationDAO from '../dao/station.js';
import ConnectionDAO from '../dao/connection.js';
import { jest } from '@jest/globals';
import db from '../database/db.js';
import {user} from './setup.js';

describe('GET /api/map', () => {

    test('should return 200', async () => {

        const num_of_stations = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(DISTINCT station_id) AS count FROM Stations',
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        const num_of_connections = await new Promise((resolve, reject) => {
            db.get(
                'SELECT DISTINCT COUNT(connection_id) AS count FROM Connections',
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        const response = await agent.get('/api/map');

        expect(response.status).toBe(200);
        expect(response.body.stations).toHaveLength(num_of_stations.count);
        expect(response.body.stations[0]).toEqual({
            station_id: expect.any(Number),
            name: expect.any(String),
            is_interchange: expect.any(Boolean)
        });

        expect(response.body.connections).toHaveLength(num_of_connections.count);
        expect(response.body.stations[0]).toEqual({
            station_id: expect.any(Number),
            name: expect.any(String),
            is_interchange: expect.any(Boolean)
        });

    });


    test('should return 500 because StationDAO.getStations() does not work', async () => {

        jest.spyOn(StationDAO, 'getStations')
            .mockRejectedValue(new Error('Database unavailable'));

        const response = await agent.get('/api/map');

        expect(response.status).toBe(500);


    });


    test('should return 401 because user is not authenticated', async () => {

        const response = await request(app).get('/api/map');

        expect(response.status).toBe(401);


    });

    test('should return 500 because ConnectionDAO.getConnections() does not work', async () => {

        jest.spyOn(ConnectionDAO, 'getConnections')
            .mockRejectedValue(new Error('Database unavailable'));

        const response = await agent.get('/api/map');

        expect(response.status).toBe(500);


    });

});




