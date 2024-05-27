import React from 'react'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import '../../Pages/Home/home.css'

const images = [
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-13.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-12.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-11.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-9.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-3.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-1.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-2.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-5.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-5.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-5.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-5.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-5.png",
    "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-14.png",
];

const HomeCat = () => {
    return (
        <div>
            <section className='homeCat'>
                <div className="container">
                    <h3 class="mb-4 hd">Featured Categories</h3>
                    <Swiper
                        slidesPerView={10}
                        spaceBetween={8}
                        navigation={true}
                        slidesPerGroup={1}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {
                            images.map((image, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="item text-center cursor">
                                            <img src={image} alt="" />
                                            <h6>Red apple</h6>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>

                </div>
            </section>
        </div>
    )
}

export default HomeCat
