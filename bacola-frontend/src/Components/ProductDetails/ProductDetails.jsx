import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../Components/ProductDetails/productDetails.css';
import { Button, Modal } from '@mui/material'; // Assuming you use Material-UI for modals
import { CiHeart } from 'react-icons/ci';
import { IoIosGitCompare } from 'react-icons/io';
import { PiTruckThin } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SiWorldhealthorganization } from "react-icons/si";
import { Rate } from 'antd';
import { Mycontext } from '../../App';
import Quantitybox from '../QuantityBox/Quantitybox';
import { BASE_URL } from '../../config';

const ProductDetails = () => {
  const { url } = useContext(Mycontext);
  const location = useLocation();
  const { item: data, averageRating } = location.state;
  const [userRating, setUserRating] = useState(0);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [comment, setComment] = useState('');
  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/ratings/user/${data._id}`, {
          headers: {
            Authorization: token,
          },
        });
        const result = await response.json();
        setUserRating(result.userRating || 0);
      } catch (error) {
        console.error('Failed to fetch user rating:', error);
      }
    };
    fetchUserRating();
  }, [data._id]);

  const handleRate = async (score) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/ratings/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ productId: data._id, score }),
      });
      setUserRating(score);
    } catch (error) {
      console.error('Failed to submit rating:', error);
    }
  };

  const openRatingModal = () => {
    setIsRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  const submitRating = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/ratings/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ productId: data._id, score: newRating }),
      });
      setUserRating(newRating);
      closeRatingModal();
    } catch (error) {
      console.error('Failed to submit rating:', error);
    }
  };

  return (
    <section className='ProductDetails section'>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to='/Home'>Home</Link> &gt; <a href="/Meats & Seafood">Meats & Seafood</a> &gt; {data.name}
        </nav>
        <h1 className='hd text-capitalize'>{data.name}</h1>
        <div className="product-main row">
          <div className="col-md-4 product-images" style={{ width: '500px' }}>
            <img src={url + "/images/" + data.image} alt='' className='w-100' />
          </div>
          <div className="product-info col-md-8">
            <div className="row">
              <div className="col-md-6">
                <div className="brand-review">
                  <span>Brand: {data.brand}</span> | <span className="review-stars">★★★★☆</span>
                  <div>Average Rating: {averageRating}</div>
                </div>
                <div className="price">
                  ${data.price} <span className="old-price">${data.oldPrice}</span>
                </div>
                <div className="description">
                  {data.description}
                </div>
                {data.quantity > 0 ? (
                  <div className="quantity-selector">
                    <Quantitybox />
                  </div>
                ) : (
                  <div className="out-of-stock">
                    <p>Out of stock</p>
                    <Button className='btn-blue btn-lg btn-big btn-round'>Notify Me</Button>
                  </div>
                )}
                <div className="actions mt-3">
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
                <div className="rating-section mt-5">
                  <h4>Rate this product</h4>
                  <Rate allowHalf value={userRating} onChange={handleRate} />
                  <Button onClick={openRatingModal}>Leave a Review</Button>
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

      {/* Rating Modal */}
      <Modal
        open={isRatingModalOpen}
        onClose={closeRatingModal}
        aria-labelledby="rating-modal-title"
        aria-describedby="rating-modal-description"
      >
        <div className="rating-modal-content">
          <h2 id="rating-modal-title">Leave a Review</h2>
          <Rate allowHalf value={newRating} onChange={setNewRating} />
          <textarea
            placeholder="Add your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            style={{ width: '100%', marginBottom: '20px', resize: 'vertical' }}
          />
          <Button onClick={submitRating}>Submit</Button>
        </div>
      </Modal>

    </section>
  );
};

export default ProductDetails;
