import db from "../database/db.js";
import Game from "../models/Game.js";

const GameDAO = {

    async getResultsById(user_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Games WHERE user_id = ?"; 

            db.all(query, [user_id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                const games = rows.map(row =>
                    new Game(
                        row.game_id,
                        row.user_id,
                        row.start_station_id,
                        row.destination_station_id,
                        row.score,
                        row.won,
                        row.played_at,
                    )
                );

                resolve(games);
            });
        });
    }

};

export default GameDAO;