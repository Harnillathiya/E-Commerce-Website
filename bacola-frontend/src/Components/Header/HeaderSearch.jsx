import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Button } from '@mui/material';
import '../Header/header.css';

const HeaderSearch = () => {
    return (
        <div className="headerSearch">
            <input type="text" placeholder='search for products....' />
            <Button className="searchButton">
                <FaSearch />
            </Button>
        </div>
    )
}

export default HeaderSearch;
