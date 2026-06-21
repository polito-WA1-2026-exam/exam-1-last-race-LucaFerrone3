import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { IsLoggedInContext } from '../../../Contexts';
import './LoginCard.css';
import { validateCredentials } from '../../../logic/validation';
import {login} from '../../../logic/loginRequest';
import {clearError} from '../../../logic/clearError';

function LoginCard() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [fetchError, setFetchError] = useState('');

    async function validateAndSubmit() {

        clearError(setEmailError);
        clearError(setPasswordError);
        clearError(setFetchError);
        const { emailErr, passwordErr } =
            validateCredentials(email, password);

        setEmailError(emailErr);
        setPasswordError(passwordErr);

        if (emailErr || passwordErr) return;

        try {

            await login(email, password);
            setIsLoggedIn(true);
            navigate('/');

        } catch (err) {

            setFetchError(
                err.message || 'Server unavailable'
            );
        }
    }


    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Container fluid className='d-flex align-items-center justify-content-center'>
                <Row className='w-100 align-items-center'>
                    <Col
                        xs={12}
                        md={6}
                        lg={4}
                        className='mx-auto'
                    >
                        <Form className='p-4 border rounded shadow login-card'>
                            <p className='login-card-title'>Login</p>
                            <Form.Group className='mb-4 px-2 px-md-4'>
                                <Form.Label className='textfield-label'>Email</Form.Label>
                                <InputGroup className='custom-input-group'>
                                    <InputGroup.Text className='custom-input-icon'>
                                        <FaUser />
                                    </InputGroup.Text>

                                    <Form.Control
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type='email'
                                        placeholder='Enter email'
                                        className='custom-input-email'
                                    />
                                </InputGroup>
                            </Form.Group>

                            {emailError && (
                                <Form.Group className='mb-3 px-2 px-md-4'>
                                    <Container className='validation-error d-flex align-items-center justify-content-center py-2'>{emailError}</Container>
                                </Form.Group>
                            )
                            }

                            <Form.Group className='mb-4 px-2 px-md-4'>
                                <Form.Label className='textfield-label'>Password</Form.Label>
                                <InputGroup className='custom-input-group'>
                                    <InputGroup.Text className='custom-input-icon'>
                                        <FaLock />
                                    </InputGroup.Text>

                                    <Form.Control
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={passwordVisible == false ? 'password' : 'text'}
                                        placeholder='Enter password'
                                        className='custom-input'
                                    />
                                    {passwordVisible == false ?
                                        <InputGroup.Text className='password-visible-icon'>
                                            <FaEye onClick={() => setPasswordVisible(!passwordVisible)} />
                                        </InputGroup.Text>
                                        : <InputGroup.Text className='password-visible-icon'>
                                            <FaEyeSlash onClick={() => setPasswordVisible(!passwordVisible)} />
                                        </InputGroup.Text>
                                    }
                                </InputGroup>
                            </Form.Group>

                            {passwordError && (
                                <Form.Group className='mb-3 px-2 px-md-4'>
                                    <Container className='validation-error d-flex align-items-center justify-content-center py-2'>{passwordError}</Container>
                                </Form.Group>
                            )
                            }

                            {fetchError && (
                                <Form.Group className='mb-3 px-2 px-md-4'>
                                    <Container className='validation-error d-flex align-items-center justify-content-center py-2'>{fetchError}</Container>
                                </Form.Group>
                            )
                            }

                            <Button onClick={validateAndSubmit} className='custom-btn-large w-100 mb-4 px-2'>
                                Login
                            </Button>
                            <p className='sign-up-label'>Don't have an account? <Link className='link-color' to='/sign-up'>Sign up</Link></p>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default LoginCard;