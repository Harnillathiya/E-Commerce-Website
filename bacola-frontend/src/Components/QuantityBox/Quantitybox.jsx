import React, { useState } from 'react'
import '../../Components/ProductModal/model.css';
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { Button } from '@mui/material';


const Quantitybox = () => {

    const [inputVal, setInputVal] = useState(1);

    const minus = () => {
        if (inputVal !== 1 && inputVal > 0) {
            setInputVal(inputVal - 1);
        }
    }
    const plus = () => {
        setInputVal(inputVal + 1);
    }

    return (
        <div className="quantity d-flex align-items-center quantity-button minus">

            <Button onClick={minus}><FiMinus /></Button>
            <input type="text" value={inputVal} />
            <Button onClick={plus}><FiPlus /></Button>

        </div>
    )
}

export default Quantitybox
