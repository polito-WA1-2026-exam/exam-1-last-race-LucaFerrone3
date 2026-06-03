import db from "../database/db.js";
import Station from "../models/Station.js";

const StationDAO = {

    async getStationById(station_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Stations WHERE station_id = ?";

            db.get(query, [station_id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(new Station(row.station_id,row.name,row.is_interchange));
            });
        });
    }

};

export default StationDAO;