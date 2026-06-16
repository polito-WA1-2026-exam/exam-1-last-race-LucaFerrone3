import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../../../components/footer/Footer';
import NavbarWithButton from '../../../components/navbars/NavbarWithButton';
import { ImCoinEuro } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ScoreContext } from '../../../Contexts'
function FinishedGamePage() {

    const [score, setScore] = useContext(ScoreContext);
    const navigate = useNavigate();

    let message, won;
    if (score <= 0) {
        won = false;
        message = 'Mission failed!';
    } else {
        won = true;
        message = 'Destination reached';
    }

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
                        
                            <p className="mb-0">{message} with {score} {score === 1 ?'coin':'coins'}!</p>
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