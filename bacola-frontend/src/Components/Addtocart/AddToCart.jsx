import React, { useContext, useEffect, useState } from 'react';
import '../../Components/Addtocart/addtocart.css';
import Quantitybox from '../QuantityBox/Quantitybox';
import { MdDeleteForever } from "react-icons/md";
import { Button } from '@mui/material';
import { BASE_URL } from '../../config';
import { Mycontext } from '../../App';

const AddToCart = ({ userId }) => {
    const [cartItems, setCartItems] = useState([]);
    const { url } = useContext(Mycontext);
    console.log(cartItems, ";;;;;;;;;");

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
                console.log(data.cartData);
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

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCartItems = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/cart/addToCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ itemId: itemId, quantity: newQuantity })
            });

            const data = await response.json();
            if (!data.success) {
                console.error('Failed to update cart quantity:', data.message);
            }
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

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
                    {cartItems.map(item => (
                        <div className="cart-item" key={item.product.id}>
                            <img src={`${url}/images/${item.product.image}`} alt={item.product.name} />
                            <div className="cart-item-details">
                                <p>{item.product.name}</p>
                                <p>${item.product.price}</p>
                                <Quantitybox
                                    quantity={item.product.quantity}
                                    onQuantityChange={(newQuantity) => handleQuantityChange(item.product.id, newQuantity)}
                                />
                            </div>
                            <Button className="remove-item" onClick={() => removeFromCart(item.itemId)}><MdDeleteForever /></Button>
                        </div>
                    ))}
                    <div className="coupon-section">
                        <input type="text" placeholder="Coupon code" />
                        <Button>Apply coupon</Button>
                    </div>
                </div>
                <div className="cart-totals">
                    {/* <p>Subtotal: <span>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span></p> */}
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
                    {/* <p>Total: <span>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + 5}</span></p> */}
                    <Button className="checkout-button">Proceed to checkout</Button>
                </div>
            </div>
        </div>
    );
}

export default AddToCart;
