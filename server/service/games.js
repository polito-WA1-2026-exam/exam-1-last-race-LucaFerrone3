import GameDAO from '../dao/game.js';
import StationDAO from '../dao/station.js';
import GameDTO from '../dto/game.js';
import ServerError from '../errors/ServerError.js';

const GameService = {

    async getResultsById(user_id) {

        const results_with_id = await GameDAO.getResultsById(user_id);

        if (!results_with_id) throw new ServerError("Error taking results");

        const results_with_name = [];
        for (const result of results_with_id) {
            const start_station = await StationDAO.getStationById(result.start_station_id);
            if (!start_station) throw new ServerError("Error taking the start station");

            const destination_station = await StationDAO.getStationById(result.destination_station_id);
            if (!destination_station) throw new ServerError("Error taking the destination station");

            results_with_name.push(new GameDTO(
                result.game_id,
                start_station.name,
                destination_station.name,
                result.score,
                result.won,
                result.played_at
            ));

        }

        return results_with_name;
    }
}

export default GameService;
