import { Container } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import Add from "../Pages/Add/Add";
import Orders from "../Pages/Orders/Orders";
import List from "../Pages/List/List";
import { Mycontext } from '../../App';
import Update from '../Pages/Update/Update';


const Dashboard = () => {
    const { url, setIsHeaderShow } = useContext(Mycontext);
    useEffect(() => {
        setIsHeaderShow(false);
    }, [setIsHeaderShow]);
    return (

        <div>
            <ToastContainer />
            <Navbar />
            <hr />
            <Container >
                <div className="app-content">
                    <Sidebar />
                    <Routes>
                        <Route path="/add" element={<Add url={url} />} />
                        <Route path="/list" element={<List url={url} />} />
                        <Route path="/orders" element={<Orders url={url} />} />
                        <Route path="/update" element={<Update url={url} />} />
                    </Routes>
                </div>
            </Container>
        </div>

    )
}

export default Dashboard
