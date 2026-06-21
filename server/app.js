// imports
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import cors from "cors";
import UserDAO from "./dao/user.js";
import UserService from "./service/users.js";

//import routes
import usersRoutes from './routes/users.js';
import mapRoutes from './routes/map.js';
import gamesRoutes from './routes/games.js';
import eventsRoutes from './routes/events.js';

// init express
const app = new express();

// init session
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        async (email, password, done) => {
            try {

                const user = await UserService.login(
                    email,
                    password,
                    done
                );

                if (!user)
                    return done(null, false, {
                        message: "Invalid credentials"
                    });

                return done(null, user);

            } catch (err) {

                return done(err);

            }
        }
    )
);

app.use(session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use((err, req, res, next) => {

    res.status(500).json({
        error: "Internal Server Error"
    });

});

app.use('/api/users', usersRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/events', eventsRoutes);

export default app;