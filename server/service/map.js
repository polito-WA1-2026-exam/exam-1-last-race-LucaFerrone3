import ConnectionDAO from '../dao/connection.js';
import StationDAO from '../dao/station.js';
import LineDAO from '../dao/line.js';
import {ConnectionDTO} from '../dto/connection.js';
import {StationDTO} from '../dto/station.js';
import {MapDTO} from '../dto/map.js';
import ServerError from '../errors/ServerError.js';

export const MapService = {

    async getMap() {

        const stations = await StationDAO.getStations();
        if (!stations) throw new ServerError("Error taking stations");

        const stationsDTOS = stations.map(station => StationDTO.from(station.station_id, station.name, station.is_interchange));

        const connections = await ConnectionDAO.getConnections();
        if (!connections) throw new ServerError("Error taking connections");

        const lines = await LineDAO.getLines();
        if (!lines) throw new ServerError("Error taking lines");

        const connectionDTOS = [];

        for (const connection of connections) {
            const station_u = stationsDTOS.find(station => station.station_id === connection.station_u_id);
            const station_v = stationsDTOS.find(station => station.station_id === connection.station_v_id);
            if (!station_u || !station_v) throw new ServerError("Error taking stations for connections");

            const line = lines.find(line => line.line_id === connection.line_id);
            if(!line) throw new ServerError("Error taking line for connections");
            

            connectionDTOS.push(ConnectionDTO.from(connection.connection_id, line, station_u, station_v));
        }

        return MapDTO.from(stationsDTOS, connectionDTOS);


    }
}
