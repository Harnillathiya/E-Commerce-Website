import { Button, Dialog } from '@mui/material';
import React, { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Rating from '@mui/material/Rating';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Quantitybox from '../QuantityBox/Quantitybox';
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import ProductZoom from '../ProductZoom/ProductZoom';
import '../../Components/ProductModal/model.css';

const Modal = (props) => {
  const [quantity, setQuantity] = useState(1);



  return (
    <div>
      <Dialog open={true} onClose={() => props.closeProductModal(false)} className='productmodal'>
        <Button className="close_2" onClick={() => props.closeProductModal(false)}> <IoCloseCircleOutline /> </Button>
        <h4 className='mb-0'>Lorem ipsum accessories five</h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <span>Brands:</span>
            <span className='ml-1'>Walch's</span>
          </div>
          <Rating name="read-only" value={2} readOnly />
        </div>
        <hr />
        <div className="row mt-3 productDetails">
          <div className="col-md-5">
            <ProductZoom />
          </div>
          <div className="col-md-7 info_details">
            <div className="d-flex info align-items-center mb-3">
              <div className="oldPrice mr-2">
                $9.35
              </div>
              <div className="netPrice text-danger">
                $7.25
              </div>
            </div>
            <span className="badge bg-success">IN STOCK</span>
            <p className='mt-2'>Vivamus adipiscing nisl ut dolor dignissim semper.
              Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent
            </p>
            <div className="quantity d-flex align-items-center">
              <Quantitybox quantity={quantity} setQuantity={setQuantity} />
              <Button className='btn-blue btn-lg btn-big btn-round'>Add to cart</Button>
            </div>
            <div className="d-flex align-items-center mt-5">
              <Button className='btn-round wishlist' variant="outlined"> <CiHeart /> &nbsp; ADD TO WISHLIST</Button>
              <Button className='btn-round wishlist wishlist-2 ml-3' variant="outlined"> <IoIosGitCompare /> &nbsp; COMPARE</Button>
            </div>
          </div>
        </div>
      </Dialog >
    </div >
  );
}

export default Modal;
