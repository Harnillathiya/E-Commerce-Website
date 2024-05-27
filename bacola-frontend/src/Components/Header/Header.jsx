import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from "../../assets/assets_2/logo.png";
import '../Header/header.css';
import Dropdown from '../ContryDropdown/Dropdown';
import { Button } from '@mui/material';
import { FaRegUserCircle } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa6";
import HeaderSearch from './HeaderSearch';
import Navigtion from './Navigtion';
import { Mycontext } from '../../App';
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const context = useContext(Mycontext);
  const navigate = useNavigate()
  const handleLogout = () => {
    context.logout();
    navigate('/login');
  };

  return (
    <div>
      <div className="headerWrapper">
        <div className="top-strip bg-blue">
          <div className="container" >
            <p className="mb-0 mt-0 text-center">
              Due to the  <b> COVID 19 </b>  epidemic, orders may be processed with a slight dealy
            </p>
          </div>
        </div>

        <header className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper d-flex align-items-center col-sm-2">
                <Link to={'/'}>
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part-2">
                {
                  context.countryList?.length !== 0 && <Dropdown />
                }
                <HeaderSearch />
                <div className="part-3 d-flex align-items-center userinfo ml-auto">
                  {context.isLogin ? (
                    <>
                      <Button className="circle" onClick={handleLogout}>
                        <FaRegUserCircle />
                      </Button>
                      <Button className='btn-blue btn-md btn-big btn-round w-100 sign_btn' onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link to="/login">
                      <Button className='btn-blue btn-md btn-big btn-round w-100 sign_btn'>
                        Login
                      </Button>
                    </Link>
                  )}
                  <div className="ml-auto cartTab d-flex align-items-center">
                    <span className="price">$3.29</span>
                    <div className="position-relative ml-2">
                      <Button className="circle" onClick={() => navigate('/addtocart')}><FaOpencart /></Button>
                      <span className=" count d-flex align-items-center justify-center">
                        1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Navigtion />
      </div>
    </div>
  )
}

export default Header;
