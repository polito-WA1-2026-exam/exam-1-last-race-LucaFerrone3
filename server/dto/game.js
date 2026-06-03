const GameDTO = {
    from(game, start_station_name, destination_station_name) {
        return {
            game_id: game.game_id,
            start_station: start_station_name,
            destination_station: destination_station_name,
            score: game.score,
            won: game.won,
            played_at: game.played_at,
        }
    }
}

const StartGameDTO = {
    from(from_station, to_station, reachable_stations) {
        return {
            from_station: from_station,
            to_station: to_station,
            reachable_stations: reachable_stations,
        }
    }
}

export default {GameDTO, StartGameDTO};
 