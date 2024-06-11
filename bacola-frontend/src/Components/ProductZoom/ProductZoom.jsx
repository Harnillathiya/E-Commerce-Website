import React, { useContext } from 'react';
import '../../Components/ProductModal/model.css';
import { Mycontext } from '../../App';

const ProductZoom = ({ images }) => {
    const { url } = useContext(Mycontext);
    const imageArray = Array.isArray(images) ? images : [images];

    return (
        <div className="productZoom">
            {imageArray.map((image, index) => (
                <div className="item" key={index}>
                    <img src={url + "/images/" + image} alt="" />
                </div>
            ))}
        </div>
    );
};

export default ProductZoom;
