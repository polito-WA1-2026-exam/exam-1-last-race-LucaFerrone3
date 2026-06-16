import NavbarTitleOnly from "../components/navbars/NavbarTitleOnly";
import LogoutCard from '../components/cards/LogoutCard/LogoutCard';
import Footer from '../components/footer/Footer'
import { Container } from "react-bootstrap";

function LogoutPage() {
    return (
        <>
            <Container
                fluid
                className="d-flex flex-column min-vh-100"
            >
                <NavbarTitleOnly />

                {/* Takes up all available space */}
                <main className="flex-grow-1 d-flex">
                    <LogoutCard />
                </main>

                <Footer />
            </Container>
        </>
    );
}

export default LogoutPage;