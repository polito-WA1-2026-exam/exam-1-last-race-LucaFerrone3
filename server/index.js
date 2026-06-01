// imports
import express from "express";

// init express
const app = new express();
const port = 3001;

// Routes
const usersRoutes = require('./routes/users');
const mapsRoutes = require('./routes/maps');
const gamesRoutes = require('./routes/games');
const eventsRoutes = require('./routes/events');

app.use('/users', usersRoutes);
app.use('/maps', mapsRoutes);
app.use('/games', gamesRoutes);
app.use('/events', eventsRoutes);


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});