import { IoIosAlert } from "react-icons/io";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {GameContext,TimeContext} from '../../../Contexts'
import './EndGameCard.css';

function EndGameCard({ previousScore }) {

    const navigate = useNavigate();

    const [gameState, setGameState] = useContext(GameContext);
    const [time, setTime] = useContext(TimeContext);

    return (
        <Container fluid className='d-flex align-items-center justify-content-center'>
            <Row className='w-100 align-items-center'>
                <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className='mx-auto'
                >
                    <div className='p-4 border rounded shadow login-card text-center'>

                        <IoIosAlert size={50} className='mb-3 end-game-card-icon' />

                        <h5 className='fw-bold mb-3'>
                            Are you sure?
                        </h5>

                        <p className='homepage-text mb-4'>
                            You will lose the progress of the match..
                        </p>

                        <div className='d-flex justify-content-center gap-3 flex-wrap'>
                            <Button
                                className='end-game-card cancel-btn-custom flex-grow1 px-2 px-md-4 mb-5'
                                onClick={() => {
                                    setGameState('start');
                                    setScore(previousScore);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                className='end-game-card custom-btn-large flex-grow1 px-2 px-md-4 mb-5'
                                onClick={() => {
                                    setGameState('start');
                                    navigate('/');
                                }}
                            >
                                Yes, I'm sure
                            </Button>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container >
    );
}

export default EndGameCard;