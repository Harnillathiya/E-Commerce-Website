import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add/Add";
import Orders from "./Pages/Orders/Orders";
import List from "./Pages/List/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from 'react-bootstrap/Container';

function App() {
  const url = "http://localhost:9000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <Container fluid="md">
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </Container>
    </div>
  );
}

export default App;
