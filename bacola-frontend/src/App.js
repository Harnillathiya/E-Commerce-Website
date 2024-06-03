import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Listing from './Pages/Listing/Listing';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import AddToCart from './Components/Addtocart/AddToCart';
import Login from './Pages/Login';
import axios from 'axios';
import ProductItem from './Components/Productitem/Productitem';
import Dashboard from './admin/Dashboard/Dashboard';
import Add from './admin/Pages/Add/Add';
import List from './admin/Pages/List/List';
import Orders from './admin/Pages/Orders/Orders';
import PlaceOrder from './Components/Placeorder/Placeorder';
import Useroder from './Pages/Useroder/Useroder';

const Mycontext = createContext(null);
const url = "http://localhost:9000";

const App = () => {
  const [countrylist, setCountrylist] = useState([]);
  const [category, setCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const [list, setList] = useState([]);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries");
    listProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[category]);

  const listProduct = async () => {
    try {
      const response = await axios.get(`${url}/api/products/list?category=${category}`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);
      setCountrylist(res.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
  };

  const values = {
    countrylist,
    selectedCountry,
    setSelectedCountry,
    isHeaderShow,
    setIsHeaderShow,
    isLogin,
    login,
    logout,
    url,
    list,
    category,
    setCategory,
  };

  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
        {isHeaderShow && <Header />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Listing' element={<Listing />} />
          <Route path='/ProductDetails' element={<ProductDetails />} />
          <Route path='/ProductItem' element={<ProductItem />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path='/addToCart' element={<AddToCart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/add' element={<Add />} />
          <Route path='/admin/list' element={<List />} />
          <Route path='/admin/orders' element={<Orders />} />
          <Route path='/useroder' element={<Useroder />} />
        </Routes>

        {isHeaderShow && <Footer />}
      </Mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { Mycontext };
