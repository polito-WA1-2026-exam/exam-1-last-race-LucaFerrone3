import { Navbar, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import './NavbarWithLink.css'

function NavbarWithLink(props) {

    const navigate = useNavigate();

    return (
        <>
            <Navbar expand="lg" className="navbar-title-with-button">
                <Container fluid >
                    <Navbar.Brand onClick={() => navigate('/')} className="brand-padding">
                        GTT - The Last Race
                    </Navbar.Brand>

                    <Navbar.Brand className="d-flex align-items-center gap-2">
                        <Link className='navbar-link-color px-2 px-md-5' to={props.type === 'home' ? '/results':'/'}>
                            {props.type === 'home' ?'Best results': 'Home'}
                        </Link>
                        <LuLogOut onClick={() => navigate('/logout')}/>
                    </Navbar.Brand>

                </Container>
            </Navbar>
        </>
    );
}

export default NavbarWithLink;

