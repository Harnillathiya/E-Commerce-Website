/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./List.css";

const List = ({ url }) => {

  const [list, setList] = useState([]);

  useEffect(() => {
    listProduct();
  }, []);

  const listProduct = async () => {
    const response = await axios.get(`${url}/api/products/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeProduct = async (productId) => {
    const response = await axios.post(`${url}/api/products/remove`, { id: productId });
    console.log(productId);
    await listProduct();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="list add flex-col ">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeProduct(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
