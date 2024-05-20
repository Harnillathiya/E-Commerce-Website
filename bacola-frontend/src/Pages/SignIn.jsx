/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginmark from "../assets/loginmark.jpeg";
// import { useNavigate } from "react-router-dom";
import '../Pages/signin.css';
import { Mycontext } from "../App";

const Signup = () => {
  const context = useContext(Mycontext);
  useEffect(() => {
    context.setIsheadrShow(false)
  },);


  return (
    <div className="signup-container">
      <div className="header_logo">
        <img className="login-image2 w-5" src={loginmark} alt="loginmark" />
      </div>
      <form className="signup-form">
        <input
          type="text"
          id="username"
          placeholder="Full Name"

          required
          className="Signup_btn"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"

          required
          className="Signup_btn"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"

          required
          className="Signup_btn"
        />
        <div className="d-flex"> <button type="submit" className="signup_btn mr-5">Signup</button>
          <Link to="/home"><button type="submit" className="signup_btn" onClick={() => context.setIsheadrShow(true)}>cancel</button></Link></div>
      </form>
      <p className="signin-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;
