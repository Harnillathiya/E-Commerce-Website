import React, { useContext, useEffect, useState } from 'react';
import '../../Components/Addtocart/addtocart.css';
import { MdDeleteForever } from "react-icons/md";
import { Button } from '@mui/material';
import { BASE_URL } from '../../config';
import { Mycontext } from '../../App';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AddToCart = ({ userId }) => {
    const [cartItems, setCartItems] = useState([]);
    const { url } = useContext(Mycontext);
    const navigate = useNavigate();


    const fetchCartData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/cart/getCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();
            if (data.success) {
                setCartItems(Object.values(data.cartData));
            } else {
                console.error('Failed to fetch cart data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        fetchCartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeFromCart = async (itemId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/cart/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ itemId })
            });

            const data = await response.json();
            if (data.success) {
                fetchCartData();
            } else {
                console.error('Failed to remove item from cart:', data.message);
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    const proceedToCheckout = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/order', {state: {cartItems: cartItems}})
        } else {
            toast.error("Please Login");
        }
    };

    const subtotal = cartItems?.reduce((total, item) => total + item?.product?.price * item?.quantity, 0);
    const total = subtotal + 5;

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
                    <div className="cart-item-header">
                        <div>Image</div>
                        <div>Title</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Total</div>
                        <div>Remove</div>
                    </div>
                    {cartItems?.map(item => (
                        <div className="cart-item" key={item?.product?.id}>
                            <div><img src={`${url}/images/${item?.product?.image}`} alt={item?.product?.name} /></div>
                            <div>{item?.product?.name}</div>
                            <div>${item?.product?.price}</div>
                            <div>{item?.quantity}</div>
                            <div>${(item?.product?.price * item?.quantity).toFixed(2)}</div>
                            <div>
                                <Button className="remove-item" onClick={() => removeFromCart(item.itemId)}>
                                    <MdDeleteForever />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="coupon-section">
                        <input type="text" placeholder="Coupon code" />
                        <Button>Apply coupon</Button>
                    </div>
                </div>
                <div className="cart-totals">
                    <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
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
                    <p>Total: <span>${total.toFixed(0)}</span></p>
                    <Button className="checkout-button" onClick={proceedToCheckout}>Proceed to checkout</Button>
                </div>
            </div>
        </div>
    );
}

export default AddToCart;
