import React from 'react'
import '../../Components/Addtocart/addtocart.css'
import Quantitybox from '../QuantityBox/Quantitybox'
import { MdDeleteForever } from "react-icons/md";
import { Button } from '@mui/material';

const AddToCart = () => {
    return (
        <div className="cart-container container mt-7">
            <div className="cart-header">
                <a href="/">HOME</a> &gt; <span>CART</span>
            </div>
            <div className="cart-main">
                <div className="cart-summary">
                    <div className="free-shipping-banner">
                        Add <span>$42.75</span> to cart and get free shipping!
                        <div className="progress-bar">
                            <div className="progress"></div>
                        </div>
                    </div>
                    <div className="cart-item">
                        <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg" alt="Product" />
                        <div className="cart-item-details">
                            <p>All Natural Italian-Style Chicken Meatballs</p>
                            <p>$7.25</p>
                            <Quantitybox />
                        </div>
                        <Button className="remove-item"><MdDeleteForever /></Button>
                    </div>
                    <div className="coupon-section">
                        <input type="text" placeholder="Coupon code" />
                        <Button>Apply coupon</Button>
                    </div>
                </div>
                <div className="cart-totals">
                    <p>Subtotal: <span>$7.25</span></p>
                    <div className="shipping-options">
                        <p>Shipping:</p>
                        <label>
                            <input type="radio" name="shipping" checked /> Flat rate: $5.00
                        </label>
                        <label>
                            <input type="radio" name="shipping" /> Local pickup
                        </label>
                        <p>Shipping to AL.</p>
                        <a href="/">Change address</a>
                    </div>
                    <p>Total: <span>$12.25</span></p>
                    <Button className="checkout-button">Proceed to checkout</Button>
                </div>
            </div>
        </div>
    )
}
export default AddToCart