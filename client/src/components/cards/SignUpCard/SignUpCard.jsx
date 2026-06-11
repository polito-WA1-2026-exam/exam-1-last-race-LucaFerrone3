import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext} from 'react';
import IsLoggedInContext from '../../../contexts/IsLoggedInContext'
import validator from "validator";
import './SignUpCard.css'

function SignUpCard() {

    const navigate = useNavigate();

    const[isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [fetchError, setFetchError] = useState('');

    async function validateAndSubmit() {

        let emailErr = '';
        let passwordErr = '';

        if (!email) {
            emailErr = 'The email is mandatory';
        } else if (!validator.isEmail(email)) {
            emailErr = 'Invalid email';
        }

        if (!password) {
            passwordErr = 'The password is mandatory';
        } else if (password.length < 4) {
            passwordErr = 'The password must contains at least 4 characters';
        }

        setEmailError(emailErr);
        setPasswordError(passwordErr);

        if (!emailErr && !passwordErr) {

            try {
                const response_create_account = await fetch(
                    'http://localhost:3001/api/users/register',
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );

                const create_account_response = await response_create_account.json();

                if (!response_create_account.ok) {
                    setFetchError(create_account_response.error || "Registration failed for unknown reason");
                    return;
                }

                const response_login = await fetch(
                    'http://localhost:3001/api/users/login',
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );

                const user = await response_login.json();

                if (!response_login.ok) {
                    setFetchError(user.error || "Login after the creation of the account is failed for unknown reason");
                    return;
                }
                setIsLoggedIn(true);
                navigate('/');

            } catch (err) {
                setFetchError("Server unavailable");
                console.error(err);
            }


        }
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
                        <Form className='p-4 border rounded shadow sign-up-card'>
                            <p className='sign-up-card-title'>Create account</p>
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

                            <Button onClick={validateAndSubmit} className='btn-custom w-100 mb-4 px-2'>
                                Sign up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default SignUpCard;