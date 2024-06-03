import React, { useState } from 'react';
import { Button, Dialog } from '@mui/material';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Rating from '@mui/material/Rating';
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import ProductZoom from '../ProductZoom/ProductZoom';
import './model.css';
import { BASE_URL } from '../../config';

const Modal = ({ product, closeProductModal, userId, cartItems, selectedProduct }) => {
  const [quantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/cart/addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          userId,
          itemId: product._id,
          quantity
        })
      });

      const data = await response.json();
      if (data.success) {
        alert("Added to cart successfully!");
      } else {
        alert("Failed to add to cart: " + data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding to cart");
    }
  };

  return (
    <div>
      <Dialog open={true} onClose={() => closeProductModal(false)} className='productmodal'>
        <Button className="close_2" onClick={() => closeProductModal(false)}> <IoCloseCircleOutline /> </Button>
        <h4 className='mb-0'>{product.name}</h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <span>Brands:</span>
            <span className='ml-1'>{product?.brand}</span>
          </div>
          <Rating name="read-only" value={product?.rating} readOnly />
        </div>
        <hr />
        <div className="row mt-3 productDetails">
          <div className="col-md-5">
            <ProductZoom images={product?.image} />
          </div>
          <div className="col-md-7 info_details">
            <div className="d-flex info align-items-center mb-3">
              <div className="oldPrice mr-2">
                ${product?.oldPrice}
              </div>
              <div className="netPrice text-danger">
                ${product?.price}
              </div>
            </div>
            <span className="badge bg-success">{product?.inStock ? 'IN STOCK' : 'OUT OF STOCK'}</span>
            <p className='mt-2'>{product?.description}</p>
            <div className="quantity d-flex align-items-center">
              <Button className='btn-blue btn-lg btn-big btn-round' onClick={handleAddToCart}>Add to cart</Button>
            </div>
            <div className="d-flex align-items-center mt-5">
              <Button className='btn-round wishlist' variant="outlined"> <CiHeart /> &nbsp; ADD TO WISHLIST</Button>
              <Button className='btn-round wishlist wishlist-2 ml-3' variant="outlined"> <IoIosGitCompare /> &nbsp; COMPARE</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Modal;
