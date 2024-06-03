import React, { useState } from 'react'
import { Button } from '@mui/material';
import { IoMenu } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";


const Navigtion = () => {
    const [isOpenSidebarNav, setisOpenSidebarNav] = useState(false);

    return (
        <div>
            <nav>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 navpart1">
                            <div className='catWrapper'>
                                <Button className="allcatTab align-items-center" onClick={() => setisOpenSidebarNav(!isOpenSidebarNav)}>
                                    <span className="mr-2 icon-1"><IoMenu /></span>
                                    <span className="text"> ALL CATEGORIES </span>
                                    <span className="ml-2 icon-2"><FaChevronDown /></span>
                                </Button>
                                <div className={`sidebarNav ${isOpenSidebarNav === true ? 'open' : ''}`}>
                                    <ul>
                                        <li><Link to="/"><Button > HOME <FaChevronRight className='ml-auto' /></Button></Link>
                                            <div className="submenu">
                                                <Link to="/" className=""><Button>clothing</Button></Link>
                                                <Link to="/" className=""><Button>footwear</Button></Link>
                                                <Link to="/" className=""><Button>watches</Button></Link>
                                                <Link to="/" className=""><Button>Cras justo</Button></Link>
                                                <Link to="/" className=""><Button>Adipisicing</Button></Link>
                                                <Link to="/" className=""><Button>footwear</Button></Link>
                                                <Link to="/" className=""><Button>watches</Button></Link>
                                            </div>
                                        </li>
                                        <li><Link to="/"><Button> SHOP <FaChevronRight className='ml-auto' /></Button></Link>
                                            <div className="submenu">
                                                <Link to="/" className=""><Button>clothing</Button></Link>
                                                <Link to="/" className=""><Button>footwear</Button></Link>
                                                <Link to="/" className=""><Button>watches</Button></Link>
                                                <Link to="/" className=""><Button>Cras justo</Button></Link>
                                                <Link to="/" className=""><Button>Adipisicing</Button></Link>
                                                <Link to="/" className=""><Button>footwear</Button></Link>
                                                <Link to="/" className=""><Button>watches</Button></Link>
                                            </div>
                                        </li>
                                        <li><Link to="/"><Button> MEATS$SEAFOOD <FaChevronRight className='ml-auto' /></Button></Link>
                                            <div className="submenu">
                                                <Link to="/" className=""><Button>clothing</Button></Link>
                                                <Link to="/" className=""><Button>footwear</Button></Link>
                                                <Link to="/" className=""><Button>watches</Button></Link>
                                                <Link to="/" className=""><Button>Cras justo</Button></Link>
                                                <Link to="/" className=""><Button>Adipisicing</Button></Link>
                                                <Link to="/" className=""><Button>footwear</Button></Link>
                                                <Link to="/" className=""><Button>watches</Button></Link>
                                            </div>
                                        </li>
                                        <li><Link to="/"><Button> BAKERY <FaChevronRight className='ml-auto' /></Button></Link>
                                            <div className="submenu">
                                                <Link to="/" className=""><Button>clothing</Button></Link>
                                                <Link to="/" className=""><Button>footwear</Button></Link>
                                                <Link to="/" className=""><Button>watches</Button></Link>
                                                <Link to="/" className=""><Button>Cras justo</Button></Link>
                                                <Link to="/" className=""><Button>Adipisicing</Button></Link>
                                                <Link to="/" className=""><Button>footwear</Button></Link>
                                                <Link to="/" className=""><Button>watches</Button></Link>
                                            </div>
                                        </li>
                                        <li><Link to="/"><Button> BEVERAGES</Button></Link></li>
                                        <li><Link to="/"><Button> BLOG</Button></Link></li>
                                        <li><Link to="/"><Button> CONTACT</Button></Link></li>
                                        <li> <Link to="/Useroder" className=""><Button>Useroder</Button></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9 navpart2 d-flex align-items-center">
                            <ul className="list list-inline ml-auto">
                                <li className="list-inline-item">
                                    <Link to="/"><Button className='nav_btn'> HOME </Button></Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/"><Button className='nav_btn'> SHOP </Button></Link>
                                    <div className="submenu shadow">
                                        <Link to="/" className=""><Button>clothing</Button></Link>
                                        <Link to="/" className=""><Button>footwear</Button></Link>
                                        <Link to="/" className=""><Button>watches</Button></Link>
                                        <Link to="/" className=""><Button>Cras justo</Button></Link>
                                        <Link to="/" className=""><Button>Adipisicing</Button></Link>
                                        <Link to="/" className=""><Button>footwear</Button></Link>
                                        <Link to="/" className=""><Button>watches</Button></Link>
                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/"><Button className='nav_btn'> MEATS$SEAFOOD </Button></Link>
                                    <div className="submenu shadow">
                                        <Link to="/" className=""><Button>clothing</Button></Link>
                                        <Link to="/" className=""><Button>footwear</Button></Link>
                                        <Link to="/" className=""><Button>watches</Button></Link>
                                        <Link to="/" className=""><Button>Cras justo</Button></Link>
                                        <Link to="/" className=""><Button>Adipisicing</Button></Link>
                                        <Link to="/" className=""><Button>footwear</Button></Link>
                                        <Link to="/" className=""><Button>watches</Button></Link>
                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/"><Button className='nav_btn'> BAKERY </Button></Link>
                                    <div className="submenu shadow">
                                        <Link to="/" className=""><Button>clothing</Button></Link>
                                        <Link to="/" className=""><Button>footwear</Button></Link>
                                        <Link to="/" className=""><Button>watches</Button></Link>
                                        <Link to="/" className=""><Button>Cras justo</Button></Link>
                                        <Link to="/" className=""><Button>Adipisicing</Button></Link>
                                        <Link to="/" className=""><Button>footwear</Button></Link>
                                        <Link to="/" className=""><Button>watches</Button></Link>
                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/"><Button className='nav_btn'> BEVERAGES </Button></Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/"><Button className='nav_btn'> BLOG </Button></Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/"><Button className='nav_btn'> CONTACT </Button></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigtion
