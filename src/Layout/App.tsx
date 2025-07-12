import React from 'react';
import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Login from '../pages/Login'
import Header from '../components/Header';
import ProductList from '../pages/Products';
import Bag from '../pages/Bag';
import Wishlist from '../pages/Wishlist';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import { getAuthUser } from '../contex/Auth';

const ProtectedRoute = () => {
  const { isLoggedIn } = getAuthUser();
  const loaction = useLocation()
  const isUser = isLoggedIn ?? false;
  return isUser ? <Outlet /> : <Navigate to="" />
}

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="mainContent" >
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/products" element={<ProductList />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/bag" element={<Bag />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
           <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
