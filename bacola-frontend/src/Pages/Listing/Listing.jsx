import React, { useState } from 'react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import '../../Components/Sidebar/listing.css';
import { Button } from '@mui/material';
import { IoMdMenu } from "react-icons/io";
import { HiViewGrid } from "react-icons/hi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Productitem from '../../Components/Productitem/Productitem';
import Pagination from '@mui/material/Pagination';



const Listing = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setProductView] = useState('four');

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="product_Listing_Page mt-4">
            <section className='product_Listing_Section'>
                <div className="container">
                    <div className="productListing d-flex">
                        <Sidebar />
                        <div className="content_right">
                            <div className="contant_primary">
                                <div class="shop-banner">
                                    <div class="module-banner image align-center align-middle">
                                        <div class="module-body">
                                            <div class="banner-wrapper">
                                                <div class="banner-content">
                                                    <div class="content-main">
                                                        <h4 class="entry-subtitle color-text xlight">Organic Meals Prepared</h4>
                                                        <h3 class="entry-title color-text large">Delivered to <strong class="color-success">your Home</strong></h3>
                                                        <div class="entry-text color-info-dark">Fully prepared &amp; delivered nationwide.</div>
                                                    </div>
                                                </div>
                                                <div class="banner-thumbnail">
                                                    <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg" className='w-100' alt="Organic Meals Prepared" />
                                                    <div className="showby mt-3 mb-3 d-flex align-items-center">
                                                        <div className="d-flex btnwrapper">
                                                            <Button onClick={() => setProductView('one')}><IoMdMenu /></Button>
                                                            <Button onClick={() => setProductView('two')}><HiViewGrid /></Button>
                                                            <Button onClick={() => setProductView('three')}><BsGrid3X3GapFill /></Button>
                                                            <Button onClick={() => setProductView('four')}><TfiLayoutGrid4Alt /></Button>
                                                        </div>
                                                        <div className="ml-auto showByfilter">
                                                            <Button onClick={handleClick}>Show 9 <FaAngleDown className='ml-2' /></Button>
                                                            <Menu
                                                                id="basic-menu"
                                                                anchorEl={anchorEl}
                                                                open={open}
                                                                onClose={handleClose}
                                                                MenuListProps={{
                                                                    'aria-labelledby': 'basic-button',
                                                                }}
                                                            >
                                                                <MenuItem onClick={handleClose}>35</MenuItem>
                                                                <MenuItem onClick={handleClose}>52</MenuItem>
                                                                <MenuItem onClick={handleClose}>10</MenuItem>
                                                            </Menu>
                                                        </div>
                                                    </div>

                                                    <div className="productlisting">
                                                        <Productitem itemView={productView} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center mb-4 mt-3">
                                <Pagination count={10} color="primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Listing;
