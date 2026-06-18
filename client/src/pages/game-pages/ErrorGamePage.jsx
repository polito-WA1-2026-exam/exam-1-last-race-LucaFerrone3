import { Container } from 'react-bootstrap';
import Footer from '../../components/footer/Footer';
import NavbarTitleOnly from '../../components/navbars/NavbarTitleOnly';

function ErrorGamePage({error}) {

    return <>
        <Container
            fluid
            className="d-flex flex-column min-vh-100"
        >

            <NavbarTitleOnly />

            {/* Takes up all available space */}
            <main className="flex-grow-1 d-flex justify-content-center align-items-center">
                <Container className='validation-error d-flex align-items-center justify-content-center py-2'>{error}</Container>
            </main>
            <Footer />
        </Container>
    </>;
}
export default ErrorGamePage;