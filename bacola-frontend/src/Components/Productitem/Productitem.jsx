import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { BsArrowsFullscreen } from "react-icons/bs";
import { TiHeartOutline } from "react-icons/ti";
import Modal from '../ProductModal/Modal';
import { useNavigate } from 'react-router-dom';




const Productitem = (props) => {
    const [isOpenProductModal, setisOpenProductModal] = useState(false);
    const viewProductDetails = (id) => {
        setisOpenProductModal(true)
    }
    const closeProductModal = () => {
        setisOpenProductModal(false)
    }
    const navigate = useNavigate()
    return (
        <>
            <div className={`productitem ${props.itemView}`}>
                <div className="imgWrapper">
                    <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-3-346x310.jpg" alt="" className='w-100' onClick={() => navigate('/ProductDetails')} />
                    <span className='badge badge-primary'>28%</span>
                    <div className="actions">
                        <Button className="btn" onClick={() => viewProductDetails(1)}><BsArrowsFullscreen /></Button>
                        <Button className="btn"><TiHeartOutline /></Button>
                    </div>
                </div>
                <div className="details">
                    <h4 className='d-flex'>wether original Carmal Hard Candies</h4>
                    <span className='text-success d-block d-flex'>in stok</span>
                    <Rating name="read-only" value={3} readOnly className='d-flex' />
                </div>
            </div>
            {
                isOpenProductModal === true && <Modal closeProductModal={closeProductModal} />
            }

        </>
    )
}

export default Productitem
