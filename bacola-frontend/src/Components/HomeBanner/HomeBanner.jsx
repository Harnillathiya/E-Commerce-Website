import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import '../../Pages/Home/home.css'

const HomeBanner = () => {

    return (
        <div className='container mt-3'>
            <div className="homeBannerSection">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    // navigation={true}
                    slidesPerGroup={1}
                    loop={true}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='item'>
                            <img src="https://sslimages.shoppersstop.com/sys-master/root/h4b/h0b/32627981975582/Static-Web-Stop-Life_06052024hu.jpg" alt="" className='w-100' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                            <img src="https://sslimages.shoppersstop.com/sys-master/root/h83/hbd/32632832032798/Static-Web-And-Forever-New_07-52024jwo.jpg" alt="" className='w-100' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='item'>
                        <img src="https://sslimages.shoppersstop.com/sys-master/root/hd0/hce/32632832557086/Static-Web-Louis-Philippe-%26-Van-Heusen_202407jq.jpg" alt="" className='w-100' />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                            <img src="https://sslimages.shoppersstop.com/sys-master/root/h13/hc8/32632832360478/Static-Web-titan%2C-casio_07052024ow.jpg" alt="" className='w-100' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='item'>
                        <img src="https://sslimages.shoppersstop.com/sys-master/root/h8f/hd2/32632832688158/Static-Web-Biba-%26-W_2938ek.jpg" alt="" className='w-100' />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item'>
                            <img src="https://sslimages.shoppersstop.com/sys-master/root/hba/h1b/32627986923550/Static-Web-puma-adidas_062jk.jpg" alt="" className='w-100' />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div >
    )
}

export default HomeBanner
