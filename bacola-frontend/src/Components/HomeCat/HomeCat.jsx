import React, { useContext, useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import '../../Pages/Home/home.css';
import { Mycontext } from '../../App';
import { BASE_URL } from '../../config';

const HomeCat = () => {
    const { category, setCategory, url } = useContext(Mycontext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${BASE_URL}/category/all`);
            const result = await response.json();
            if (result.success) {
                setCategories(result.categories);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const getImagePath = (imagePath) => {
        return `${url}/images/${imagePath.replace(/\\/g, '/').replace('uploads/', '')}`;
    };

    return (
        <div>
            <section className='homeCat'>
                <div className="container homecat_2">
                    <h3 className="mb-4 hd">Featured Categories</h3>
                    <Swiper
                        slidesPerView={10}
                        spaceBetween={8}
                        navigation={true}
                        slidesPerGroup={1}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {categories.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    onClick={() => setCategory(prev => (prev === item.name ? 'All' : item.name))}
                                    className={`item text-center cursor ${category === item.name ? 'active' : ''}`}
                                >
                                    <img src={getImagePath(item.image)} alt="" className={category === item.name ? 'active' : ''} />
                                    <p>{item.name}</p>
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
