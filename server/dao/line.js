import db from "../database/db.js";
import Line from "../models/Line.js";

const LineDAO = {

    async getLines() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Lines";

            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                const lines = rows.map(row =>
                    new Line(row.line_id, row.name)
                );

                resolve(lines);
            });
        });
    }

};

export default LineDAO;