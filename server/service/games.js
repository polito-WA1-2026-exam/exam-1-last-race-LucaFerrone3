import GameDAO from '../dao/game.js';
import StationDAO from '../dao/station.js';
import {GameDTO} from '../dto/game.js';
import ServerError from '../errors/ServerError.js';
import ValidationError from '../errors/ValidationError.js';

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

        
            results_with_name.push(GameDTO.from(
                result,
                start_station.name,
                destination_station.name
            ));

        }

        return results_with_name;
    },

    async createGame(user_id, body) {

        const start_station_id = body.start_station_id;
        const destination_station_id = body.destination_station_id;
        const score = body.score;
        const won = body.won;
        const played_at = body.played_at;

        if (user_id===undefined) throw new ValidationError("user_id field is required");
        if (start_station_id === undefined) throw new ValidationError("start_station_id field is required");
        if (destination_station_id === undefined) throw new ValidationError("destination_station_id field is required");
        if (score === undefined) throw new ValidationError("score field is required");
        if (won === undefined) throw new ValidationError("won field is required");
        if (played_at === undefined) throw new ValidationError("played_at field is required");

        if (start_station_id < 0 ) throw new ValidationError("start_station_id must be positive");
        if (destination_station_id < 0) throw new ValidationError("destination_station_id must be positive");

        if(score < 0) throw new ValidationError("score field must be a positive number");
        if(won !== true && won !== false) throw new ValidationError("won field must be either false or true");

        const game = await GameDAO.createGame(user_id, start_station_id, destination_station_id, score, won, played_at);
        if (!game) throw new ServerError("Error creating game");

        const start_station = await StationDAO.getStationById(game.start_station_id);   
        if (!start_station) throw new ServerError("Error taking the start station");

        const destination_station = await StationDAO.getStationById(game.destination_station_id);
        if (!destination_station) throw new ServerError("Error taking the destination station");



        return GameDTO.from(game, start_station.name, destination_station.name);
    }

}

export default GameService;
