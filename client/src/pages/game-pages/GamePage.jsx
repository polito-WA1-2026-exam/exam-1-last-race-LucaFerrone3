import StartGamePage from './start-game/StartGamePage';
import EndGamePage from './end-game/EndGamePage';
import FinishedGamePage from './finish-game/FinishedGamePage';
import { useState, useEffect } from 'react';
import { GameContext, ScoreContext, TimeContext, ConnectionContext, StartingStationContext, DestinationStationContext, ConnectionsSelectedContext, StationsContext, GameErrorContext } from '../../Contexts';
import { getTwoRandomStations, createGraph, shuffle } from './GameFunctions'
import ExecuteGamePage from './execute-game/ExecuteGamePage';
import { Container } from 'react-bootstrap';
import ErrorGamePage from './ErrorGamePage'
import { clearError } from '../../logic/clearError';

function GamePage() {

    const [gameState, setGameState] = useState("start");
    const [score, setScore] = useState(20);
    const [time, setTime] = useState(90);

    const [stations, setStations] = useState([]);
    const [connections, setConnections] = useState([]);

    const [startingStation, setStartingStation] = useState("");
    const [destinationStation, setDestinationStation] = useState("");

    const [connectionsSelected, setConnectionsSelected] = useState([]);

    const [graph, setGraph] = useState({});

    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        const setupGame = async () => {
            clearError(setFetchError);
            try {
                const response = await fetch("http://localhost:3001/api/map", {
                    method: 'GET',
                    credentials: 'include',

                });

                if (!response.ok) {
                    setFetchError(response.error || "Game setup failed for unknown reason");
                    setGameState('error');
                    return;
                }

                const data = await response.json();

                setStations(data.stations);
                setConnections(shuffle(data.connections));

                const graph = createGraph(data.connections, setGraph);
                const randomStations = getTwoRandomStations(graph);

                setStartingStation(data.stations.find(
                    station => station.station_id === Number(randomStations.start_station_id)
                ));

                setDestinationStation(data.stations.find(
                    station => station.station_id === Number(randomStations.destination_station_id)
                ));


            } catch (err) {
                setFetchError("Server unavailable");
                setGameState('error');
            }
        };

        setupGame();
    }, []);

    switch (gameState) {
        case "start":

            return <>
                <GameContext.Provider value={[gameState, setGameState]}>
                    <ScoreContext.Provider value={[score, setScore]}>
                        <TimeContext.Provider value={[time, setTime]}>
                            <StartingStationContext.Provider value={[startingStation,]}>
                                <DestinationStationContext.Provider value={[destinationStation,]}>
                                    <ConnectionContext.Provider value={[connections, setConnections]} >
                                        <ConnectionsSelectedContext.Provider value={[connectionsSelected, setConnectionsSelected]}>
                                            <StartGamePage />
                                        </ConnectionsSelectedContext.Provider>
                                    </ConnectionContext.Provider>
                                </DestinationStationContext.Provider>
                            </StartingStationContext.Provider>
                        </TimeContext.Provider>
                    </ScoreContext.Provider>
                </GameContext.Provider>
            </>;

        case "execute":
            return <>
                <GameContext.Provider value={[gameState, setGameState]}>
                    <ScoreContext.Provider value={[score, setScore]}>
                        <StartingStationContext.Provider value={[startingStation,]}>
                            <DestinationStationContext.Provider value={[destinationStation,]}>
                                <ConnectionContext.Provider value={[connections, setConnections]} >
                                    <ConnectionsSelectedContext.Provider value={[connectionsSelected, setConnectionsSelected]}>
                                        <StationsContext.Provider value={[stations, setStations]}>
                                            <GameErrorContext.Provider value={[fetchError, setFetchError]}>
                                                <ExecuteGamePage />
                                            </GameErrorContext.Provider>
                                        </StationsContext.Provider>
                                    </ConnectionsSelectedContext.Provider>
                                </ConnectionContext.Provider>
                            </DestinationStationContext.Provider>
                        </StartingStationContext.Provider>
                    </ScoreContext.Provider>
                </GameContext.Provider>
            </>;

        case "end":
            return <>
                <GameContext.Provider value={[gameState, setGameState]}>
                    <TimeContext.Provider value={[time, setTime]}>
                        <ScoreContext.Provider value={[score, setScore]}>
                            <EndGamePage previousTime={time} />
                        </ScoreContext.Provider>
                    </TimeContext.Provider>
                </GameContext.Provider >

            </>;
        case "finished":
            return <>
                <GameContext.Provider value={[gameState, setGameState]}>
                    <StartingStationContext.Provider value={[startingStation,]}>
                        <DestinationStationContext.Provider value={[destinationStation,]}>
                            <ScoreContext.Provider value={[score, setScore]}>
                                <GameErrorContext.Provider value={[fetchError, setFetchError]}>
                                    <FinishedGamePage />
                                </GameErrorContext.Provider>
                            </ScoreContext.Provider>
                        </DestinationStationContext.Provider>
                    </StartingStationContext.Provider>
                </GameContext.Provider>
            </>;
        case "error":
            return <ErrorGamePage error={fetchError} />
    }

}

export default GamePage;
