import EndGameCard from '../../../components/cards/EndGameCard/EndGameCard';
import { Container } from 'react-bootstrap';
import Footer from '../../../components/footer/Footer';
import NavbarTitleOnly from '../../../components/navbars/NavbarTitleOnly';

function EndGamePage() {
    return <>
        <Container
            fluid
            className="d-flex flex-column min-vh-100"
        >

            <NavbarTitleOnly />

            {/* Takes up all available space */}
            <main className="flex-grow-1 d-flex">
                <EndGameCard />
            </main>

            <Footer />
        </Container>
    </>;
}
export default EndGamePage;