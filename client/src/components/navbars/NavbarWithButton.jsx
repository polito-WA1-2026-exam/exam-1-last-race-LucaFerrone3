import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavbarWithButton({title, click_function}) {
    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" className="custom-navbar-title">
                <Container fluid >
                    <Navbar.Brand onClick={() => navigate('/')} className="brand-padding">
                        GTT - The Last Race
                    </Navbar.Brand>

                    <Navbar.Brand className="d-flex align-items-center gap-2">
                        <Button onClick={() => click_function() } className='custom-btn px-2 px-md-4' size='sm'>
                            {title}
                        </Button>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarWithButton;

