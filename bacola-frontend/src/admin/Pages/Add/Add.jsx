import React, { useContext, useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../Assets/assets";
import { toast } from "react-toastify";
import { Mycontext } from "../../../App";
import { BASE_URL } from "../../../config";


const Add = ({ url }) => {
  const { setIsHeaderShow } = useContext(Mycontext);

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    quntity: "",
  });
  useEffect(() => {
    setIsHeaderShow(false);
  }, [setIsHeaderShow]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("quntity", Number(data.quntity));

    try {
      const response = await fetch(`${BASE_URL}/products/add`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
          quntity: "",
        });
        setImage(null);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error adding product");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-container">
      <h2>Add Product</h2>
      <form className="add-form" onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload" />
            <input onChange={handleImageChange} type="file" id="image" hidden required />
          </label>
        </div>
        <div className="add-input">
          <label htmlFor="name">Product Name:</label>
          <input onChange={onChangeHandler} value={data.name} type="text" id="name" name="name" placeholder="Type here" required />
        </div>
        <div className="add-input">
          <label htmlFor="description">Product Description:</label>
          <textarea onChange={onChangeHandler} value={data.description} id="description" name="description" rows="6" placeholder="Write content here" required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-input">
            <label htmlFor="category">Product Category:</label>
            <select onChange={onChangeHandler} value={data.category} id="category" name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-input">
            <label htmlFor="price">Product Price:</label>
            <input onChange={onChangeHandler} value={data.price} type="number" id="price" name="price" placeholder="$20" required />
            <label htmlFor="quntity">Product quntity:</label>
            <input onChange={onChangeHandler} value={data.quntity} type="number" id="quntity" name="quntity" placeholder="1" required />
            
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
