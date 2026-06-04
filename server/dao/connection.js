import db from "../database/db.js";
import Connection from "../models/Connection.js";

const ConnectionDAO = {

    async getConnections() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Connections";

            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                const connections = rows.map(row =>
                    new Connection(row.connection_id, row.line_id, row.from_station_id, row.to_station_id)
                );

                resolve(connections);
            });
        });
    }


};

export default ConnectionDAO;