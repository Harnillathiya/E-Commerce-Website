import React, { useContext, useState } from 'react';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { BsArrowsFullscreen } from "react-icons/bs";
import { TiHeartOutline } from "react-icons/ti";
import Modal from '../ProductModal/Modal';
import { useNavigate } from 'react-router-dom';
import './productItem.css';
import { Mycontext } from '../../App';

const ProductItem = () => {
    const [isOpenProductModal, setIsOpenProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();
    const { list, url } = useContext(Mycontext);

    const viewProductDetails = (item) => {
        setSelectedProduct(item);
        // console.log(item);
        setIsOpenProductModal(true);
    };

    const closeProductModal = () => {
        setIsOpenProductModal(false);
    };


    return (
        <>
            <div className="productitem">
                {list?.map((item, index) => (
                    <div key={index} >
                        <div className="imgWrapper">
                            <img src={url + "/images/" + item.image} alt="" className='w-100' onClick={() => navigate(`/ProductDetails`, { state: { item: item } })} />
                            <span className='badge badge-primary'>28 %</span>
                            <div className="actions">
                                <Button className="btn" onClick={() => viewProductDetails(item)}><BsArrowsFullscreen /></Button>
                                <Button className="btn"><TiHeartOutline /></Button>
                            </div>
                        </div>
                        <div className="details">
                            <h4 className='d-flex'>{item.name}</h4>
                            <span className='text-success d-block d-flex'>{item.countInStock > 0 ? 'In stock' : 'Out of stock'}</span>
                            <Rating name="read-only" value={item.rating} readOnly className='d-flex' />
                        </div>
                    </div>
                ))}
            </div>
            {isOpenProductModal && (
                <Modal
                    product={selectedProduct}
                    closeProductModal={closeProductModal}
                />
            )}
        </>
    );
};

export default ProductItem;
