import NavbarWithButton from "../components/navbars/NavbarWithButton";
import NavbarWithLink from "../components/navbars/NavbarWithLink/NavbarWithLink";
import Footer from '../components/footer/Footer'
import Map from '../components/maps/map/Map'

import {IsLoggedInContext} from '../Contexts'

import { Container, Button, Col } from "react-bootstrap";
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const [isLoggedIn] = useContext(IsLoggedInContext);

    const navigate = useNavigate();

    return (
        <>
            <Container
                fluid
                className="d-flex flex-column min-vh-100"
            >
                
                {isLoggedIn ? <NavbarWithLink type={'home'} /> : <NavbarWithButton title='Sign up to play' click_function = {()=>{navigate('/login')}}/>}


                {/* Takes up all available space */}
                <main className="flex-grow-1 d-flex mx-2 mx-md-4 mx-lg-5">
                    <Col className="d-flex flex-column align-items-center gap-3">
                        <Col className="d-flex flex-column align-items-center">

                            <Map/>

                            <Button
                                onClick={() => isLoggedIn ? navigate('/game') : navigate('/login')}
                                className="custom-btn px-2 px-md-4 mb-5"
                            >
                                {isLoggedIn ? 'Start to play' : 'Sign up to play'}
                            </Button>

                        </Col>

                        <Col className='custom-text d-flex flex-column align-items-start mx-2 mx-md-4 mx-lg-5'>
                            <strong className="mb-4">Welcome to GTT - The Last Race!</strong>
                            <Col>
                                <p>
                                    GTT – The Last Race is a memory and route-planning game inspired by Turin's public transport network. <br />

                                    Designed to help players become familiar with the city's routes and gain confidence in navigating the GTT system, the game turns learning into an engaging challenge. <br />

                                    At the beginning of each round, you are assigned a random departure station and a destination station. Your objective is to study the available connections, mentally reconstruct the network, and build a valid route before time runs out.

                                    During the journey, unexpected events may reward you with extra coins or penalize your score, making every game unique.<br />

                                    Success depends on your ability to remember station connections, identify the correct path, and reach your destination with as many coins as possible. <br />

                                    Whether you are a resident, a student, or a visitor, GTT – The Last Race offers a fun way to learn Turin's transport network and master its routes. </p>

                                <p className="mt-2">Can you find the right path and complete the last race?</p>

                            </Col>

                        </Col>

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                    </Col>
                </main>

                
                <Footer />
                
            </Container>
        </>
    );
}

export default HomePage;