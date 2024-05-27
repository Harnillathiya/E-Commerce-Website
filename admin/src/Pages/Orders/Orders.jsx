import React, { useState } from "react";
import "./Orders.css";
import { assets } from "../../Assets/assets";

const Orders = () => {
  // Initialize orders state with static data or an empty array
  const [orders, setOrders] = useState([
    {
      _id: 1,
      items: [
        { name: "Burger", quantity: 2 },
        { name: "Pizza", quantity: 1 },
      ],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "City",
        state: "State",
        country: "Country",
        zipcode: "12345",
        phone: "123-456-7890",
      },
      amount: 25.99,
      status: "Food Processing",
    },
    // Add more static data items if needed
  ]);

  // Function to handle status update
  const statusHandler = (event, orderId) => {
    const updatedOrders = orders.map((order) =>
      order._id === orderId ? { ...order, status: event.target.value } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="order add ">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
