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
    const { list, url, category } = useContext(Mycontext);

    const viewProductDetails = (item) => {
        setSelectedProduct(item);
        setIsOpenProductModal(true);
    };

    const closeProductModal = () => {
        setIsOpenProductModal(false);
    };

    return (
        <>
            <div className="productitem">
                {list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <div key={index}>
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
                                    <span className={`text-${item.quantity === 0 ? 'danger' : item.quantity < 10 ? 'warning' : 'success'} d-block d-flex`}>
                                        {item.quantity === 0 ? 'Out of stock' : item.quantity < 10 ? `Limited stock ${item.quantity}` :  item.quantity }
                                    </span>
                                    <Rating name="read-only" value={item.rating} readOnly className='d-flex' />
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
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
