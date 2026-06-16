import { Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavbarTitleOnly() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" className="custom-navbar-title">
                <Container fluid >
                    <Navbar.Brand onClick={() => navigate('/')} className="brand-padding">
                        GTT - The Last Race
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarTitleOnly;

