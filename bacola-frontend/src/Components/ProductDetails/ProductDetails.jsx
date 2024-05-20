import React from 'react'
import '../../Components/ProductDetails/productDetails.css';
import Quantitybox from '../QuantityBox/Quantitybox';
import ProductZoom from '../ProductZoom/ProductZoom';
import { Button, Link } from '@mui/material';
import { CiHeart } from 'react-icons/ci';
import { IoIosGitCompare } from 'react-icons/io';
import { PiTruckThin } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SiWorldhealthorganization } from "react-icons/si";


const ProductDetails = () => {
  return (
    <section className='ProductDetails section'>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to='/Home'>Home</Link> &gt; <a href="Meats & Seafood">Meats & Seafood</a> &gt; All Natural Italian-Style Chicken Meatballs
        </nav>
        <h1 className='hd text-capitalize'>All Natural Italian-Style Chicken Meatballs</h1>
        <div className="product-main row">
          <div className=" col-md-4product-images" style={{ width: '500px' }}>
            <ProductZoom />
          </div>
          <div className="product-info col-md-8">
            <div className="row">
              <div className="col-md-6">
                <div className="brand-review">
                  <span>Brand: Welch's</span> | <span className="review-stars">★★★☆☆</span>
                </div>
                <div className="price">
                  $7.25 <span className="old-price">$9.35</span>
                </div>
                <div className="description">
                  Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent.
                </div>
                <div className="quantity-selector">
                  <Quantitybox />
                </div>
                <div className="actions mt-3">
                  <Button className='btn-blue btn-lg btn-big btn-round'>Add to cart</Button>
                  <Button className='btn-round wishlist' variant="outlined"> <CiHeart /> &nbsp; ADD TO WISHLIST</Button>
                  <Button className='btn-round wishlist wishlist-2 ml-3' variant="outlined"> <IoIosGitCompare /> &nbsp; COMPARE</Button>
                </div>
                <div className="product-details mt-5">
                  <p>Type: Organic</p>
                  <p>MFG: Jun 4, 2021</p>
                  <p>LIFE: 30 days</p>
                  <p>Category: Meats & Seafood</p>
                  <p>Tags: chicken, natural, organic</p>
                </div>
                <div className="social-icons mobile-social-icon mt-10">
                  <a href="/facebook"><img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-facebook-white.svg" alt="Facebook" /></a>
                  <a href="/twitter"><img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-twitter-white.svg" alt="Twitter" /></a>
                  <a href="/instagram"><img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-instagram-white.svg" alt="Instagram" /></a>
                  <a href="/pinterest"><img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-pinterest-white.svg" alt="Pinterest" /></a>
                  <a href="/youtube"><img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-youtube-white.svg" alt="Youtube" /></a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sidebar">
                  <div className="info-box d-flex flex-col">
                    <p className='d-flex align-items-center'> <span className='mr-3 '><PiTruckThin /></span>Free Shipping apply to all orders over $100</p>
                    <p className='d-flex align-items-center'><span className='mr-3 '><SiWorldhealthorganization /></span>Guaranteed 100% Organic from natural farms</p>
                    <p className='d-flex align-items-center'><span className='mr-3 '><RiMoneyDollarCircleLine /></span>1 Day Returns if you change your mind</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

