import React from "react";
import "./Navbar.css";
import { assets } from "../../Assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/bacola-logo.png" alt="" />
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
