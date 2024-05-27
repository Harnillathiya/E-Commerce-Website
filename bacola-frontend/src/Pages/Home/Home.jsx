import React from 'react'
import HomeBanner from '../../Components/HomeBanner/HomeBanner'
import '../../Pages/Home/home.css'
import { Button } from '@mui/material';
import { FaArrowRightLong } from "react-icons/fa6";
import 'swiper/css/navigation';
import 'swiper/css';
import Productitem from '../../Components/Productitem/Productitem';
import HomeCat from '../../Components/HomeCat/HomeCat';
import { useNavigate } from 'react-router-dom';





const Home = () => {
  const navigate = useNavigate()


  return (
    <div>
      <HomeBanner />
      <HomeCat className="d-none d-md-block" />

      <section className='homeprdoucts'>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-3">
              <div className="sticky">
                <div className="banner home-banner">
                  <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/banner-box.jpg" className="cursor" alt="" />
                  <div className="text-wrapper">
                    <span>Bacola Natural Foods</span>
                    <p style={{ fontSize: '25px', fontWeight: '500' }}>Special Organic</p>
                    <h2>Rustic Burger</h2>
                    <span>only from</span>
                    <p style={{ fontSize: '30px', fontWeight: '700', color: 'red' }}>$14.99</p>
                  </div>
                </div>

                <div className="banner home-banner mt-5">
                  <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/bacola-banner-04.jpg" className="cursor" alt="" />
                  <div className="text-wrapper">
                    <span>Bacola Natural Foods</span>
                    <p style={{ fontSize: '25px', fontWeight: '500' }}>Special Organic</p>
                    <h2>Rustic Burger</h2>
                    <span>only from</span>
                    <p style={{ fontSize: '30px', fontWeight: '700', color: 'red' }}>$14.99</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-9">
              <div className="d-flex align-items-center mt-5">
                <div className="info w-75 mb-0">
                  <h3 className='mb-0 hd'>BEST SELLER</h3>
                  <p className='text-home text-sml mb-0'>Do not miss the current offers until the end of March.</p>
                </div>
                <Button className='banner-btn ml-auto' onClick={() => navigate('/Listing')} > -View all <FaArrowRightLong className='mr-2' /></Button>
              </div>
              <div className="produt_row productRow2 w-100 mt-4 d-flex">
                <Productitem />
              </div>

              <div className="d-flex mt-4">
                <div className="banner mr-1">
                  <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-2.png" alt="" />
                  <div className="text-wrapper-banner">
                    <h2>Everyday Fresh &
                      Clean with Our
                      Products</h2>
                    <Button>shop</Button>
                  </div>
                </div>
                <div className="banner ml-1">
                  <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-1.png" alt="" />
                  <div className="text-wrapper-banner">
                    <h2>Make your Breakfast
                      Healthy and Easy</h2>
                    <Button>shop</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >

      </section >




    </div >
  )
}

export default Home
