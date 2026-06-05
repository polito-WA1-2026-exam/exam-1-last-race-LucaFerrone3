CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL
);

CREATE TABLE Stations (
    station_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    is_interchange INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE Games (
    game_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    start_station_id INTEGER NOT NULL,
    destination_station_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    won INTEGER NOT NULL,
    played_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (start_station_id) REFERENCES Stations(station_id),
    FOREIGN KEY (destination_station_id) REFERENCES Stations(station_id)
);

CREATE TABLE Events (
    event_id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    score INTEGER NOT NULL
);

CREATE TABLE Lines (
    line_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE Connections (
    connection_id INTEGER PRIMARY KEY,
    line_id INTEGER NOT NULL,
    station_u INTEGER NOT NULL,
    station_v INTEGER NOT NULL,
    FOREIGN KEY (line_id) REFERENCES Lines(line_id),
    FOREIGN KEY (station_u) REFERENCES Stations(station_id),
    FOREIGN KEY (station_v) REFERENCES Stations(station_id)
);


/*
The LineStations table is useful to retrieve the order of stations in a line using:
    SELECT *
    FROM LineStations
    WHERE line_id = XXXXX
    ORDER BY position;
*/

CREATE TABLE LineStations (
    line_id INTEGER NOT NULL,
    station_id INTEGER NOT NULL,
    position INTEGER NOT NULL,
    PRIMARY KEY (line_id, position),
    FOREIGN KEY (line_id) REFERENCES Lines(line_id),
    FOREIGN KEY (station_id) REFERENCES Stations(station_id)
);