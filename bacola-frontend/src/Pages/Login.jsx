import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import loginmark from "../assets/loginmark.jpeg";
import '../Pages/login.css';
import { Container } from '@mui/material';
import { Mycontext } from '../App';

const Login = () => {
    const context = useContext(Mycontext);
    useEffect(() => {
        context.setIsheadrShow(false)
    },);

    return (
        <div className="login-container">
            <Container>
                <Row>
                    <Col span={12}>
                        <img className="login-image" src={loginmark} alt="loginmark" />
                    </Col>
                    <Col span={12} className="login-form-container">
                        <span className='heading'>Happening now. Join today.</span>
                        <form className="login-form">
                            <div className="input-field">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    required autoComplete="current-email"
                                    className="login-input"
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type='password'
                                    id="password"
                                    placeholder="Password"
                                    required autoComplete="current-password"
                                    className="login-input"
                                />

                            </div>
                            <div className="d-flex">
                                <button type="submit" className="login-button mr-5">Log in</button>
                                <Link to="/home"><button type="submit" className="signup_btn" onClick={()=>context.setIsheadrShow(true)}>cancel</button></Link>
                            </div>
                        </form>
                        <p className="signup-link">
                            Don't have an account? <Link to="/signin">Sign up now</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default Login;
