import NavbarTitleOnly from "../components/navbars/NavbarTitleOnly";
import LoginCard from '../components/cards/LoginCard/LoginCard';
import Footer from '../components/footer/Footer'
import { Container } from "react-bootstrap";
function LoginPage() {
    return (
        <>
            <Container
                fluid
                className="d-flex flex-column min-vh-100"
            >
                <NavbarTitleOnly />

                {/* Takes up all available space */}
                <main className="flex-grow-1 d-flex">
                    <LoginCard />
                </main>

                <Footer />
            </Container>
        </>
    );
}

export default LoginPage;