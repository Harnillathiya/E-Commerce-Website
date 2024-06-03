import React from "react";
import "./Navbar.css";
import { assets } from "../../Assets/assets";
import { Dropdown } from 'antd';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handelclick = () => {
    navigate(`/login`)
    window.location.reload()
  }
  const items = [
    {
      key: '1',
      label: (
        <a href="login" onClick={handelclick}>
          logout
        </a>
      ),
    },]
  return (
    <div className="navbar container">
      <img className="logo" src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/bacola-logo.png" alt="" />
      <Dropdown menu={{ items, }} placement="bottomRight" arrow >
        <img className="profile" src={assets.profile_image} alt="" />
      </Dropdown>
    </div>
  );
};

export default Navbar;
