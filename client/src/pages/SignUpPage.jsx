import NavbarTitleOnly from "../components/navbars/NavbarTitleOnly/NavbarTitleOnly";
import SignUpCard from '../components/cards/SignUpCard/SignUpCard';
import Footer from '../components/footer/Footer'
import { Container } from "react-bootstrap";

function SignUpPage() {
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
                    <SignUpCard />
                </div>

                {/* occupa solo lo spazio necessario */}
                <div>
                    <Footer />
                </div>
            </Container>
        </>
    );
}

export default SignUpPage;
