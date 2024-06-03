import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { Mycontext } from "../../App";
import { BASE_URL } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    // eslint-disable-next-line no-unused-vars
    const { list } = useContext(Mycontext);
    const location = useLocation();
    const navigate = useNavigate();
    const oderdata = location.state.cartItems;
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const calculateSubtotal = () => {
        if (!oderdata) {
            return 0;
        }
        return oderdata?.reduce((total, item) => total + item?.product?.price * item?.quantity, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        return subtotal + 5; // Adding a fixed delivery fee of 5
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded. Make sure to include the script in your HTML.");
            return;
        }

        const orderItems = oderdata.map(item => ({
            ...item.product,
            quantity: item.quantity
        }));

        const orderData = {
            address: data,
            items: orderItems,
            amount: calculateTotal()
        };

        try {
            const token = localStorage.getItem("token");
            const keyResponse = await fetch(`${BASE_URL}/getkey`, {
                headers: {
                    Authorization: token
                }
            });
            if (!keyResponse.ok) {
                throw new Error("Failed to get Razorpay key");
            }
            const { key } = await keyResponse.json();

            const checkoutResponse = await fetch(`${BASE_URL}/payment/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ orderDataAmount: orderData.amount })
            });

            if (!checkoutResponse.ok) {
                throw new Error(`HTTP error! status: ${checkoutResponse.status}`);
            }

            const { data } = await checkoutResponse.json();
            const order_id = data.id;

            const options = {
                key: key,
                amount: orderData.amount * 100,
                currency: "INR",
                name: "Tomato",
                description: "Tutorial of RazorPay",
                image: "https://avatars.githubusercontent.com/u/25058652?v=4",
                order_id: order_id,
                callback_url: `${BASE_URL}/payment/paymentverification`,
                prefill: {
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                    contact: data.phone,
                },
                notes: {
                    address: `${data.street}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.country}`,
                },
                theme: {
                    color: "#121212",
                },
                handler: async (response) => {
                    try {
                        // const token = localStorage.getItem("token");
                        const verificationResponse = await fetch(`${BASE_URL}/payment/paymentverification`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: token
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderData: orderData
                            })
                        });

                        if (verificationResponse.ok) {
                            navigate('/');
                        } else {
                            throw new Error("Payment verification failed");
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        alert("Payment verification failed. Please try again.");
                    }
                },
            };
            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <form onSubmit={placeOrder} className="place-order container">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First name"
                        required
                    />
                    <input
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last name"
                        required
                    />
                </div>
                <input
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email address"
                    required
                />
                <input
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text"
                    placeholder="Street"
                    required
                />
                <div className="multi-fields">
                    <input
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        type="text"
                        placeholder="City"
                        required
                    />
                    <input
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        type="text"
                        placeholder="State"
                        required
                    />
                </div>
                <div className="multi-fields">
                    <input
                        name="zipcode"
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        type="text"
                        placeholder="Zip code"
                        required
                    />
                    <input
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        placeholder="Country"
                        required
                    />
                </div>
                <input
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="text"
                    placeholder="Phone"
                    required
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${calculateSubtotal()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${calculateSubtotal() === 0 ? 0 : 5}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>${calculateTotal()}</p>
                        </div>
                    </div>
                    <button type="submit">PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;

