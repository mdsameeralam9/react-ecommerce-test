import React from 'react';
import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Login from '../pages/Login'
import Header from '../components/Header';
import ProductList from '../pages/Products';
import Wishlist from '../pages/Wishlist';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Cart from '../pages/Bag';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isUser = isLoggedIn ?? false;
  return isUser ? <Outlet /> : <Navigate to="" state={{ from: location }} replace />
}

// how to login and logout using this token 
// how to accees route and refresh if fail in intersection
// other login logot scenarios
// seesion based login

// font
// optimisation
// ErrorBoundry
// redux toolkit - list add, wishlist addredd checkout, payment, header status

// how many ways for protected route
// role based login
// multi lang
// dark ligh theme
// search filter sidebar, details

function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="mainContent" >
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/bag" element={<Cart />} />
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
