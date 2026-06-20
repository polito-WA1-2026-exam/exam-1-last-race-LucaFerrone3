import { FaSignOutAlt } from 'react-icons/fa';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { IsLoggedInContext } from '../../../Contexts';
import './LogoutCard.css';
import {clearError} from '../../../logic/clearError';

function LogoutCard() {

    const navigate = useNavigate();
    const [, setIsLoggedIn] = useContext(IsLoggedInContext);
    const [fetchError, setFetchError] = useState('');

    async function handleLogout() {
        clearError(setFetchError);
        try {
            const response = await fetch(
                'http://localhost:3001/api/users/logout',
                {
                    method: 'POST',
                    credentials: 'include'
                }
            );

            if (!response.ok) {
                setFetchError(user.error || "Logout failed for unknown reason");
                return;
            }

            setIsLoggedIn(false);
            navigate('/');

        } catch (err) {
            setFetchError("Server unavailable");
            console.error(err);
        }
    }

    return (
        <Container fluid className='d-flex align-items-center justify-content-center'>
            <Row className='w-100 align-items-center'>
                <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className='mx-auto'
                >
                    <div className='p-4 border rounded shadow login-card text-center'>

                        <FaSignOutAlt size={50} className='mb-3 logout-icon' />

                        <h5 className='fw-bold mb-3'>
                            Are you sure?
                        </h5>

                        <p className='homepage-text mb-4'>
                            You will be logged out and returned to the home page. <br />
                            You will not be able to play until you log in again. <br />
                            Are you sure? <br />
                        </p>

                        <div className='d-flex justify-content-center gap-3 flex-wrap'>
                            <Button
                                className='logout cancel-btn-custom flex-grow1 px-2 px-md-4 mb-5'
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>

                            <Button
                                className='logout custom-btn-large flex-grow1 px-2 px-md-4 mb-5'
                                onClick={handleLogout}
                            >
                                Yes, I'm sure
                            </Button>
                        </div>

                    </div>

                    {fetchError && (
                        <Container className='validation-error d-flex align-items-center justify-content-center my-5 py-2'>{fetchError}</Container>
                    )
                    }
                </Col>



            </Row>
        </Container>
    );
}

export default LogoutCard;