import NavbarWithButton from '../../../components/navbars/NavbarWithButton';
import Footer from '../../../components/footer/Footer';
import { Container, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from 'react';
import MapWithoutConnections from '../../../components/maps/map-without-connections/MapWithoutConnections';
import ListOfConnections from '../../../components/list-of-connections/ListOfConnections';
import { ScoreContext, TimeContext, GameContext } from '../../../Contexts';

function StartGamePage() {

    const [time, setTime] = useContext(TimeContext);
    const [gameState, setGameState] = useContext(GameContext);
    const [score, setScore] = useContext(ScoreContext);

    useEffect(() => {
        if (gameState === 'start') {
            const interval = setInterval(() => {
                setTime(prev => {
                    if (prev <= 0) {
                        setGameState('invalid');
                        /*
                        if (score > 0) {
                            setGameState('valid');
                        } else {
                            setGameState('invalid');
                        }
                        */
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, []);

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
                            setGameState('end');
                        }} />

                {/* Takes up all available space */}
                <main className="flex-grow-1 d-flex">
                    <Col className="d-flex flex-column h-100">

                        <Row className="justify-content-center mt-5">
                            <Col xs="auto">
                                <p className="mb-0">Departure station: </p>
                            </Col>
                            <Col xs="auto">
                                <p className="mb-0">Destination station: </p>
                            </Col>
                        </Row>

                        <Row className="justify-content-center mt-5">
                            <Col xs="auto">
                                <p className="mb-0">Remaining time: {time} s</p>
                            </Col>
                        </Row>

                        <Row className="flex-grow-1 mx-3">
                            <Col
                                xs={12}
                                md={6}
                                order={{ xs: 2, md: 1 }}
                            >
                                <ListOfConnections />
                            </Col>

                            <Col
                                xs={12}
                                md={6}
                                order={{ xs: 1, md: 2 }}
                            >
                                <MapWithoutConnections />
                            </Col>
                        </Row>

                    </Col>
                </main>

                <Footer />
            </Container>
        </>
    );
}

export default StartGamePage;