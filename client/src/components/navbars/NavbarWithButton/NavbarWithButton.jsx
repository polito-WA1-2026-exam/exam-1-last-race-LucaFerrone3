import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NavbarWithButton.css'

function NavbarWithButton() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" className="navbar-title-with-button">
                <Container fluid >
                    <Navbar.Brand onClick={() => navigate('/')} className="brand-padding">
                        GTT - The Last Race
                    </Navbar.Brand>

                    <Navbar.Brand className="d-flex align-items-center gap-2">
                        <Button onClick={() => navigate('/login')} className='navbar-btn-custom px-2 px-md-4' size='sm'>
                            Sign up to play
                        </Button>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarWithButton;

