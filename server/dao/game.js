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
    },


    async createGame(user_id, start_station_id, destination_station_id, score, won, played_at) {
        return new Promise((resolve, reject) => {

            const query = `INSERT INTO Games(user_id, start_station_id, destination_station_id, score, won, played_at) VALUES(?, ?, ?, ?, ?, ?)`;

            db.run(
                    query,
                    [
                        user_id,
                        start_station_id,
                        destination_station_id,
                        score,
                        won,
                        played_at
                    ],
                    function (err) {
                        if (err) {
                            reject(err);
                            return;
                        } else {
                            resolve(new Game(this.lastID, user_id, start_station_id, destination_station_id, score, won, played_at));
                        }
                    }
                );
        });
    },

};

export default GameDAO;