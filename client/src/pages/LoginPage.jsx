import NavbarTitleOnly from "../components/navbars/NavbarTitleOnly/NavbarTitleOnly";
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
                {/* occupa solo lo spazio necessario */}
                <div>
                    <NavbarTitleOnly />
                </div>

                {/* si espande al massimo */}
                <div className="flex-grow-1 d-flex">
                    <LoginCard />
                </div>

                {/* occupa solo lo spazio necessario */}
                <div>
                    <Footer />
                </div>
            </Container>
        </>
    );
}

export default LoginPage;