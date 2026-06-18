import NavbarWithButton from '../../../components/navbars/NavbarWithButton';
import Footer from '../../../components/footer/Footer';
import { Container, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from 'react';
import MapWithoutConnections from '../../../components/maps/map-without-connections/MapWithoutConnections';
import ListOfConnections from '../../../components/list-of-connections/ListOfConnections';
import { ScoreContext, TimeContext, GameContext, StartingStationContext, DestinationStationContext, ConnectionContext, ConnectionsSelectedContext } from '../../../Contexts';
import { validateRoute } from '../GameFunctions';

function StartGamePage() {

    const [time, setTime] = useContext(TimeContext);
    const [gameState, setGameState] = useContext(GameContext);
    const [score, setScore] = useContext(ScoreContext);

    const [startingStation,] = useContext(StartingStationContext);
    const [destinationStation,] = useContext(DestinationStationContext);
    const [connections, setConnections] = useContext(ConnectionContext);
    const [connectionsSelected, setConnectionsSelected] = useContext(ConnectionsSelectedContext);

    useEffect(() => {
        if (gameState === 'start') {
            const interval = setInterval(() => {
                setTime(prev => {
                    if (prev <= 0) {
                        if (validateRoute(startingStation, destinationStation, connections, connectionsSelected)) {
                            setGameState('execute');
                        } else {
                            setScore(0);
                            setGameState('finished');
                        }
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [gameState,
        startingStation,
        destinationStation,
        connections,
        connectionsSelected]);

    return (
        <>
            <Container
                fluid
                className="d-flex flex-column min-vh-100"
            >

                <NavbarWithButton
                    title='End game'
                    click_function={
                        () => {
                            if (validateRoute(startingStation, destinationStation, connections, connectionsSelected)) {
                                setTime(0);
                                setGameState('execute');
                            } else {
                                setGameState('end');
                            }
                        }} />

                {/* Takes up all available space */}
                <main className="flex-grow-1 d-flex">
                    <Row className="flex-grow-1 mx-3">

                        <Col xs={12} md={6} className="text-center d-flex flex-column justify-content-center">
                            <div>
                                <p className="mb-0">
                                    <b>Starting station:</b> {startingStation.name}
                                </p>
                                <p className="mb-0">
                                    <b>Destination station:</b> {destinationStation.name}
                                </p>
                            </div>
                        </Col>

                        <Col xs={12} md={6} className="text-center d-flex flex-column justify-content-center mb-3 mb-md-0">
                            <p className="mb-0">
                                <b>Remaining time:</b> {time} s
                            </p>
                        </Col>

                        <Col
                            xs={12}
                            md={6}
                            className="d-flex justify-content-center"
                        >
                            <ListOfConnections />
                        </Col>

                        <Col
                            xs={12}
                            md={6}
                            className="d-flex justify-content-center"
                        >
                            <MapWithoutConnections />
                        </Col>

                    </Row>
                </main>

                <Footer />
            </Container>
        </>
    );
}

export default StartGamePage;