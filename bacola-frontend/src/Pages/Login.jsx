import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';
import '../Pages/login.css';
import { Mycontext } from '../App';
import { BASE_URL } from "../config";

const Login = () => {
    const { setIsHeaderShow, login } = useContext(Mycontext);
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });

    useEffect(() => {
        setIsHeaderShow(false);
    
    }, [setIsHeaderShow]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignup) {

            try {
                const response = await fetch(`${BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                if (data.success) {
                    setIsSignup(false);
                }
            } catch (error) {
                // Handle error without alert
            }
        } else {

            try {
                const response = await fetch(`${BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                const data = await response.json();
                if (data.success) {
                    login(data.token);
                    setIsHeaderShow(true);
                    if (data.role === "user") {
                        navigate("/");
                    } else {
                        navigate("/admin");
                        setIsHeaderShow(false);
                    }
                }
            } catch (error) {
                // Handle error without alert
            }
        }
    };

    const toggleForm = () => {
        setIsSignup(!isSignup);
        setFormData({ email: '', password: '', username: '' });
    };

    return (
        <div className={`cont ${isSignup ? 's--signup' : ''}`}>
            <div className="form sign-in">
                <h2>Welcome</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <p className="forgot-pass">Forgot password?</p>
                    <button type="submit" className="submit_4">{isSignup ? 'Sign Up' : 'Sign In'}</button>
                </form>
            </div>
            <div className="sub-cont">
                <div className="img">
                    <div className={`img__text m--up ${isSignup ? 'hidden' : ''}`}>
                        <h3>Don't have an account? Please Sign up!</h3>
                    </div>
                    <div className={`img__text m--in ${isSignup ? '' : 'hidden'}`}>
                        <h3>If you already have an account, just sign in.</h3>
                    </div>
                    <div className="img__btn" onClick={toggleForm}>
                        <span className="m--up">Sign Up</span>
                        <span className="m--in">Sign In</span>
                    </div>
                </div>
                {isSignup && (
                    <div className="form sign-up">
                        <h2>Create your Account</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <span>Name</span>
                                <input
                                    type="text"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                <span>Email</span>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                <span>Password</span>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="submit" className="submit_4">Sign Up</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
