import db from "../database/db.js";
import crypto from 'crypto';
import User from "../models/User.js";

const UserDao = {

    async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users WHERE email=?';
            db.get(query, [email], (err, row) => {
                if (err) {
                    reject(err);
                }
                if (row === undefined) {
                    resolve(false);
                } else {
                    resolve(new User(row.user_id, row.email, row.password_hash, row.salt));
                }
            });
        });
    },

    async getUser (email, password) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users WHERE email=?';
            db.get(query, [email], (err, row) => {
                if (err) {
                    reject(err);
                }
                if (row === undefined) {
                    resolve(false);
                } else {
                    crypto.scrypt(password, row.salt, 32, (err, hashedPassword) => {
                        if (err) {
                            reject(err);
                        }
                        if (!crypto.timingSafeEqual(Buffer.from(row.password_hash, 'hex'), hashedPassword)) {
                            resolve(false);
                        } else {
                            resolve(new User(row.user_id, row.email, row.password_hash, row.salt));
                        }
                    });
                }
            });
        });

    },

    async createUser(email, password) {
        return new Promise((resolve, reject) => {

            const salt = crypto.randomBytes(16).toString('hex');

            crypto.scrypt(password, salt, 32, (err, hashedPassword) => {

                if (err) {
                    reject(err);
                }

                const query = `INSERT INTO Users(email, password_hash, salt) VALUES(?, ?, ?)`;

                db.run(
                    query,
                    [
                        email,
                        hashedPassword.toString('hex'),
                        salt
                    ],
                    function (err) {

                        if (err) {
                            reject(err);
                        } else {
                            resolve(new User(this.lastID, email, hashedPassword.toString('hex'), salt));
                        }
                    }
                );
            });
        });
    },

}

export default UserDao;