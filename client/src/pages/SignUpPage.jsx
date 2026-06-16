import NavbarTitleOnly from "../components/navbars/NavbarTitleOnly";
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
                <NavbarTitleOnly />

                {/* Takes up all available space */}
                <main className="flex-grow-1 d-flex"> 
                    <SignUpCard /> 
                </main>
                
                <Footer />
            </Container>
        </>
    );
}

export default SignUpPage;
