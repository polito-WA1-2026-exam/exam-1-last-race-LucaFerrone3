import { Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NavbarTitleOnly.css'

function NavbarTitleOnly() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" className="navbar-title-only">
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

