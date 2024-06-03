/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./List.css";
import { BASE_URL } from "../../../config";
import Update from "../Update/Update";
import { Button } from "@mui/material";

const List = ({ url }) => {

  const [list, setList] = useState([]);

  useEffect(() => {
    listProduct();
  }, []);

  const listProduct = async () => {
    const response = await axios.get(`${BASE_URL}/products/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
    console.log(response.data.data);
  };

  const removeProduct = async (productId) => {
    const response = await axios.post(`${BASE_URL}/products/remove`, { id: productId });
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
              <img src={`http://localhost:9000/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p>{item.quantity}</p>
              <p onClick={() => removeProduct(item._id)} className="cursor">
                X
              </p>
              <Button><Update /></Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
