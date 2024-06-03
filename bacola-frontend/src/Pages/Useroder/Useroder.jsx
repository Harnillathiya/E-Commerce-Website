// import React, { useEffect, useState } from "react";
// import "./Useroder.css";
// import { assets } from "../../assets/food del assets/frontend_assets/assets";
// import { BASE_URL } from "../../config";

// const Useroder = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(`${BASE_URL}/payment/userorders`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: token,
//                 },
//             });

//             const result = await response.json();
//             if (result.success) {
//                 setData(result.data);
//                 console.log(result.data);
//             } else {
//                 console.error("Error fetching orders", result.message);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <div className="my-orders">
//             <h2>My Orders</h2>
//             <div className="container">
//                 {data?.map((order, index) => (
//                     <div key={index} className="my-orders-order">
//                         <img src={assets.parcel_icon} alt="" />
//                         <p>
//                             {order.items.map((item, idx) => (
//                                 <span key={idx}>
//                                     {item.productId.name} x {item.quantity}
//                                     {idx !== order.items.length - 1 && ", "}
//                                 </span>
//                             ))}
//                         </p>
//                         <p>${order.totalAmount}.00</p>
//                         <p>Items: {order.items.length}</p>
//                         <p>
//                             <span>&#x25cf;</span>
//                             <b>{order.status}</b>
//                         </p>
//                         <button onClick={fetchOrders}>Track Order</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Useroder;
