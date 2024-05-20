import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Listing from './Pages/Listing/Listing';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import AddToCart from './Components/Addtocart/AddToCart';
import axios from 'axios';
import Signup from './Pages/SignIn';
import Login from './Pages/Login';

const Mycontext = createContext();

const App = () => {
  const [countrylist, setCountrylist] = useState([]);
  const [selectedCountry, setselectedCountry] = useState('');
  const [isheadershow, setIsheadrShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries");
  }, []);

  const getCountry = async (url) => {
    const res = await axios.get(url);
    setCountrylist(res.data.data);
  };

  

  const values = {
    countrylist,
    selectedCountry,
    setselectedCountry,
    isheadershow,
    setIsheadrShow,
    setIsLogin,
    isLogin,
  };

  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
        {
          isheadershow === true && <Header />
        }

        <Routes>
          <Route path='/home' exact element={<Home />} />
          <Route path='/Listing' exact element={<Listing />} />
          <Route path='/ProductDetails' exact element={<ProductDetails />} />
          <Route path='/addToCart' exact element={<AddToCart />} />
          <Route path='/signin' exact element={<Signup />} />
          <Route path='/login' exact element={<Login />} />
        </Routes>

        {
          isheadershow === true && <Footer />
        }
      </Mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { Mycontext };
