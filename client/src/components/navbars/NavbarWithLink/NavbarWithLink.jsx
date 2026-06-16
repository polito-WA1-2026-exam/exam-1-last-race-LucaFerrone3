import { Navbar, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import './NavbarWithLink.css'

function NavbarWithLink({ type }) {

    const navigate = useNavigate();
    
    let to_route,link_title;
    if (type === 'home') {
        to_route = '/results';
        link_title = 'Best results';
    } else {
        to_route = '/';
        link_title = 'Home';
    }


    return (
        <>
            <Navbar expand="lg" className="custom-navbar-title">
                <Container fluid >
                    <Navbar.Brand onClick={() => navigate('/')} className="brand-padding">
                        GTT - The Last Race
                    </Navbar.Brand>

                    <Navbar.Brand className="d-flex align-items-center gap-2">
                        <Link className='navbar-link-color px-2 px-md-5' to={to_route}>
                            {link_title}
                        </Link>
                        <LuLogOut onClick={() => navigate('/logout')} />
                    </Navbar.Brand>

                </Container>
            </Navbar>
        </>
    );
}

export default NavbarWithLink;

