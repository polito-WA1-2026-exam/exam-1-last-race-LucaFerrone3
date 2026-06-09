import { Navbar, Container } from 'react-bootstrap';
import './NavbarTitleOnly.css'

function NavbarTitleOnly() {
    return (
        <>
            <Navbar expand="lg" className="navbar-title-only">
                <Container fluid >
                    <Navbar.Brand className="brand-padding">
                        GTT - The Last Race
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarTitleOnly;

