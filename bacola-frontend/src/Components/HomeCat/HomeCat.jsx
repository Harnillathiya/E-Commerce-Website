import React, { useContext } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import '../../Pages/Home/home.css';
import { menu_list } from '../../assets/food del assets/frontend_assets/assets';
import { Mycontext } from '../../App';

const HomeCat = () => {
    const { category, setCategory } = useContext(Mycontext);

    return (
        <div>
            <section className='homeCat'>
                <div className="container homecat_2 ">
                    <h3 className="mb-4 hd">Featured Categories</h3>
                    <Swiper
                        slidesPerView={10}
                        spaceBetween={8}
                        navigation={true}
                        slidesPerGroup={1}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {menu_list.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    onClick={() => setCategory(prev => (prev === item.menu_name ? 'All' : item.menu_name))}
                                    className="item text-center cursor"
                                >
                                    <img src={item.menu_image} alt="" className={category === item.menu_name ? 'active' : ''} />
                                    <p>{item.menu_name}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default HomeCat;
