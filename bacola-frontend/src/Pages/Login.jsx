import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginmark from "../assets/assets_2/loginmark.jpeg";
import '../Pages/login.css';
import { Mycontext } from '../App';
import { BASE_URL } from "../config";

const Login = () => {
    const context = useContext(Mycontext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        context.setIsheadrShow(false);
    }, [context]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                context.login(data.token);
                context.setIsheadrShow(true);
                navigate("/");
            } else {
                console.error('Failed to login:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container container">
            <div className="header_logo">
                <img className="login-image" src={loginmark} alt="loginmark" />
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required autoComplete="current-email"
                        className="login-input"
                    />
                </div>
                <div className="input-field">
                    <input
                        type='password'
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required autoComplete="current-password"
                        className="login-input"
                    />
                </div>
                <div className="d-flex">
                    <button type="submit" className="login-button mr-5">Log in</button>
                    <Link to="/">
                        <button type="button" className="signup_btn" onClick={() => context.setIsheadrShow(true)}>Cancel</button>
                    </Link>
                </div>
                <p className="signup-link">
                    Don't have an account? <Link to="/signin">Sign up now</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
