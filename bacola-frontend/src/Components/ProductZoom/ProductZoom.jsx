import React, { useContext, useRef } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import Slider from 'react-slick';
import '../../Components/ProductModal/model.css';
import { Mycontext } from '../../App';

const ProductZoom = ({ images }) => {
    const zoomSliderBig = useRef();
    const zoomSlider = useRef();
    const { url } = useContext(Mycontext);


    const goto = (index) => {
        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    };

    const settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
    };
    const imageArray = Array.isArray(images) ? images : [images];

    return (
        <>
            <div className="productZoom">
                <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
                    {imageArray.map((image, index) => (
                        <div className="item" key={index}>
                            <InnerImageZoom
                                zoomType="hover" zoomScale={1}
                                src={url + "/images/" + image}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                {imageArray.map((image, index) => (
                    <div className="item" key={index}>
                        <img src={url + "/images/" + image} alt="" onClick={() => goto(index)} />
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default ProductZoom;
