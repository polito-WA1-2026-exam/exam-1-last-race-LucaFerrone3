import db from "../database/db.js";
import Event from "../models/Event.js";

const EventDAO = {

    async getEvents() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Events";

            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                const events = rows.map(row =>
                    new Event(
                        row.event_id,
                        row.description,
                        row.score
                    )
                );

                resolve(events);
            });
        });
    }

};

export default EventDAO;