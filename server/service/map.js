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
            const fromStation = stationsDTOS.find(station => station.station_id === connection.from_station_id);
            const toStation = stationsDTOS.find(station => station.station_id === connection.to_station_id);
            if (!fromStation || !toStation) throw new ServerError("Error taking stations for connections");

            const line = lines.find(line => line.line_id === connection.line_id);
            if(!line) throw new ServerError("Error taking line for connections");
            

            connectionDTOS.push(ConnectionDTO.from(connection.connection_id, line, fromStation, toStation));
        }

        return MapDTO.from(stationsDTOS, connectionDTOS);


    }
}
