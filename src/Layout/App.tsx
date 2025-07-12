import React from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Header from '../components/Header';
import ProductList from '../pages/Products';

function App() {

  return (
    <BrowserRouter>
     <Header />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        {/* <Route path="/products" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
