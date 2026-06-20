import EventCard from '../../../components/cards/EventCard/EventCard';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import Footer from '../../../components/footer/Footer';
import NavbarTitleOnly from '../../../components/navbars/NavbarTitleOnly';
import { ImCoinEuro } from "react-icons/im";
import { getOrderedConnectionOfRoutes } from '../GameFunctions';
import { GameErrorContext, ScoreContext, DestinationStationContext, StartingStationContext, ConnectionsSelectedContext, ConnectionContext, StationsContext, GameContext } from '../../../Contexts';
import './ExecuteGamePage.css';
import { clearError } from '../../../logic/clearError';

function ExecuteGamePage() {

    const [score, setScore] = useContext(ScoreContext);
    const [gameState, setGameState] = useContext(GameContext);
    const [startingStation,] = useContext(StartingStationContext);
    const [destinationStation,] = useContext(DestinationStationContext);
    const [stations, setStations] = useContext(StationsContext)
    const [connections, setConnections] = useContext(ConnectionContext);
    const [connectionsSelected, setConnectionsSelected] = useContext(ConnectionsSelectedContext);

    const routes = getOrderedConnectionOfRoutes(startingStation, destinationStation, connections, connectionsSelected);

    const [eventCount, setEventCount] = useState(0);
    const [events, setEvents] = useState([]);

    const [fetchError, setFetchError] = useContext(GameErrorContext);

    useEffect(() => {
        const getEvents = async () => {
            clearError(setFetchError);
            try {
                const response = await fetch(
                    `http://localhost:3001/api/events?steps=${routes.length}`,
                    {
                        method: 'GET',
                        credentials: 'include'
                    }
                );

                const events_json = await response.json();

                if (!response.ok) {
                    setFetchError(events_json.error || "Retrieving events failed for unknown reason");
                    setGameState('error');
                    return;
                }

                setEvents(events_json);

            } catch (err) {
                setFetchError("Server unavailable");
                setGameState('error');
                console.error(err);
            }
        };

        getEvents();
    }, []);


    function nextEvent() {
        setScore(score + events[eventCount].score);
        if (eventCount == routes.length - 1)
            setGameState('finished');
        else {
            setEventCount(eventCount + 1);
        }
    }

    return <>
        <Container
            fluid
            className="d-flex flex-column min-vh-100"
        >

            <NavbarTitleOnly />
            <Row className="d-flex justify-content-center">
                <Col xs="auto">
                    <p className="custom-text my-5 mb-0">
                        {
                            stations.find(
                                station => station.station_id === routes[eventCount].from_station
                            )?.name
                        } → {
                            stations.find(
                                station => station.station_id === routes[eventCount].to_station
                            )?.name
                        }
                    </p>
                </Col>
            </Row>

            <main className="flex-grow-1 d-flex">
                <Row className="flex-grow-1 align-items-center mx-3 ">
                    <Col className="d-flex align-items-center justify-content-center">
                        <p className="mb-0 me-2 custom-text">{score}</p>
                        <ImCoinEuro size={32} className='coin-icon' />
                    </Col>

                    <Col md={7} className="d-flex align-items-center">
                        {events.length > 0 && (
                            <EventCard
                                classname='w-100'
                                points={events[eventCount].score}
                                description={events[eventCount].description}
                            />
                        )}
                    </Col>

                    <Col className="d-flex align-items-center justify-content-center">
                        <Button onClick={() => nextEvent()} className='custom-btn px-2 px-md-4' size='sm'>
                            {eventCount == routes.length - 1 ? 'End game' : 'Next event'}
                        </Button>
                    </Col>
                </Row>
            </main>

            <Footer />
        </Container>
    </>;
}
export default ExecuteGamePage;