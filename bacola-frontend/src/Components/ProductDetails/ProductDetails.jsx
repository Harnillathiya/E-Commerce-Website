import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../Components/ProductDetails/productDetails.css';
import Quantitybox from '../QuantityBox/Quantitybox';
import { Button } from '@mui/material';
import { CiHeart } from 'react-icons/ci';
import { IoIosGitCompare } from 'react-icons/io';
import { PiTruckThin } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SiWorldhealthorganization } from "react-icons/si";
import { Mycontext } from '../../App';

const ProductDetails = () => {
  const { url } = useContext(Mycontext);
  const location = useLocation()
  console.log(location);
  const data = location.state.item;
  console.log(data.image);

  return (
    <section className='ProductDetails section'>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to='/Home'>Home</Link> &gt; <a href="/Meats & Seafood">Meats & Seafood</a> &gt; {data.name}
        </nav>
        <h1 className='hd text-capitalize'>{<datalist></datalist>}{data.name}</h1>
        <div className="product-main row">
          <div className="col-md-4 product-images" style={{ width: '500px' }}>
            <img src={url + "/images/" + data.image} alt='' className='w-100'/>
          </div>
          <div className="product-info col-md-8">
            <div className="row">
              <div className="col-md-6">
                <div className="brand-review">
                  <span>Brand: {data.brand}</span> | <span className="review-stars">★★★★☆</span>
                </div>
                <div className="price">
                  ${data.price} <span className="old-price">${data.oldPrice}</span>
                </div>
                <div className="description">
                  {data.description}
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
                  <p>Type: {data.type}</p>
                  <p>MFG: {data.mfgDate}</p>
                  <p>LIFE: {data.life}</p>
                  <p>Category: {data.category}</p>
                  <p>Tags: {data.tags}</p>
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
                    <p className='d-flex align-items-center'> <span className='mr-3'><PiTruckThin /></span>Free Shipping apply to all orders over $100</p>
                    <p className='d-flex align-items-center'><span className='mr-3'><SiWorldhealthorganization /></span>Guaranteed 100% Organic from natural farms</p>
                    <p className='d-flex align-items-center'><span className='mr-3'><RiMoneyDollarCircleLine /></span>1 Day Returns if you change your mind</p>
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
