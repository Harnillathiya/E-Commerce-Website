import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginmark from "../assets/assets_2/loginmark.jpeg";
import '../Pages/signin.css';
import { Mycontext } from "../App";
import { BASE_URL } from "../config";

const Signup = () => {
  const context = useContext(Mycontext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <div className="header_logo">
        <img className="login-image2 w-5" src={loginmark} alt="loginmark" />
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          required
          className="Signup_btn"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="Signup_btn"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="Signup_btn"
        />
        <div className="d-flex">
          <button type="submit" className="signup_btn mr-5">Signup</button>
          <Link to="/">
            <button type="button" className="signup_btn" onClick={() => context.setIsheadrShow(true)}>Cancel</button>
          </Link>
        </div>
      </form>
      <p className="signin-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;
