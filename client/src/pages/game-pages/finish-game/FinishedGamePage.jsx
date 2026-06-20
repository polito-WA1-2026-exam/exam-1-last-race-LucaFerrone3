import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../../../components/footer/Footer';
import NavbarWithButton from '../../../components/navbars/NavbarWithButton';
import { ImCoinEuro } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ScoreContext, DestinationStationContext, StartingStationContext, GameContext, GameErrorContext} from '../../../Contexts';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { clearError } from '../../../logic/clearError';

function FinishedGamePage() {

    const [score, setScore] = useContext(ScoreContext);
    const [startingStation,] = useContext(StartingStationContext);
    const [destinationStation,] = useContext(DestinationStationContext);

    const played_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const navigate = useNavigate();

    const [fetchError, setFetchError] = useContext(GameErrorContext);
    const [gameState, setGameState] = useContext(GameContext);

    let message, won;
    if (score <= 0) {
        won = false;
        message = 'Mission failed!';
    } else {
        won = true;
        message = 'Destination reached';
    }

    useEffect(() => {
        if (score < 0) {
            setScore(0);
        }
    }, [score]);

    useEffect(() => {
        const addResult = async () => {
            clearError(setFetchError);
            const finalScore = score < 0 ? 0 : score;
            try {
                const response = await fetch(
                    'http://localhost:3001/api/games/result',
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            start_station_id: startingStation.station_id,
                            destination_station_id: destinationStation.station_id,
                            score: finalScore,
                            won,
                            played_at
                        })
                    }
                );

                const events_json = await response.json();

                if (!response.ok) {
                    setFetchError(events_json.error || "Retrieving events failed for unknown reason");
                    setGameState('error');
                    return;
                }

            } catch (err) {
                setFetchError("Server unavailable");
                setGameState('error');
                console.error(err);
            }
        };

        addResult();
    }, []);


    return <>
        <Container
            fluid
            className="d-flex flex-column min-vh-100"
        >

            <NavbarWithButton title={'Back to home'} click_function={() => navigate('/')} />

            {/* Takes up all available space */}
            <main className="flex-grow-1 d-flex justify-content-center align-items-center">
                {won ? (
                    <Container className="custom-text text-center">
                        <p className="mb-0">{message} with {score} {score === 1 ? 'coin' : 'coins'}!</p>
                    </Container>
                ) : (
                    <Container className="custom-text text-center">
                        <p className="mb-0">{message}</p>
                    </Container>
                )}
            </main>

            <Footer />
        </Container>
    </>;
}
export default FinishedGamePage;