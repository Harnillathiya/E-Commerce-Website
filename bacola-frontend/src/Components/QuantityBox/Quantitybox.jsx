import React, { useState, useEffect } from 'react';
import { FiMinus, FiPlus } from "react-icons/fi";
import { Button } from '@mui/material';

const Quantitybox = ({ quantity, onQuantityChange }) => {
    const [inputVal, setInputVal] = useState(quantity || 1);

    useEffect(() => {
        setInputVal(quantity || 1);
    }, [quantity]);

    const handleChange = (newVal) => {
        const parsedVal = parseInt(newVal);
        if (!isNaN(parsedVal)) {
            setInputVal(parsedVal);
            if (onQuantityChange) {
                onQuantityChange(parsedVal);
            }
        }
    };

    const minus = () => {
        if (inputVal > 1) {
            handleChange(inputVal - 1);
        }
    };

    const plus = () => {
        handleChange(inputVal + 1);
    };

    return (
        <div className="quantity d-flex align-items-center quantity-button minus">
            <Button onClick={minus}><FiMinus /></Button>
            <input  value={inputVal} onChange={(e) => handleChange(e.target.value)} />
            <Button onClick={plus}><FiPlus /></Button>
        </div>
    );
};

export default Quantitybox;
