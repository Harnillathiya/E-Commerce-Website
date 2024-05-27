import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Listing from './Pages/Listing/Listing';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import AddToCart from './Components/Addtocart/AddToCart';
import Signup from './Pages/SignIn';
import Login from './Pages/Login';
import axios from 'axios';
import ProductItem from './Components/Productitem/Productitem';
const Mycontext = createContext(null);
const url = "http://localhost:9000";

const App = () => {
  const [countrylist, setCountrylist] = useState([]);
  const [selectedCountry, setselectedCountry] = useState('');
  const [isheadershow, setIsheadrShow] = useState(true);
  const [list, setList] = useState([]);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries");
    listProduct();
  }, []);
  

  const listProduct = async () => {
    const response = await axios.get(`${url}/api/products/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      console.log("Error");
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
    setselectedCountry,
    isheadershow,
    setIsheadrShow,
    isLogin,
    login,
    logout,
    url,
    list,
  };

  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
        {isheadershow && <Header />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Listing' element={<Listing />} />
          <Route path='/ProductDetails' element={<ProductDetails />} />
          <Route path='/ProductItem' element={<ProductItem />} />
          <Route path='/addToCart' element={<AddToCart />} />
          <Route path='/signin' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>

        {isheadershow && <Footer />}
      </Mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { Mycontext };
