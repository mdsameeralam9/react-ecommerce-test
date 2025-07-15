import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import './header.scss';
import { axiosInstance } from '../../services/APIConfig';
import { ClipLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {  setAuthState, authState } = useAuth();
  const handlelogout = async () => {
    // make an api call
    setLoading(true)
    try {
      await new Promise((res) => setTimeout(() => { res(1) }, 1000))
      const response = await axiosInstance.get('/logout', { withCredentials: true });
      if(!response?.data?.ok){
        throw new Error("failed to logout")
      }
      setAuthState(a => ({...a, accessToken:"", isLoggedIn: false}))
    } catch (error) {
      alert("Failed to logout")
    } finally {
      setLoading(false)
    }

  }
  return (
    <header className="main-header">
      <div className="brand">
        <Link to="/products">
          {/* <img src="/logo.png" alt="Brand Logo" /> */}
          Shop Online
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/products?query=men's clothing">Men</Link>
        <Link to="/products?query=women's clothing">Women</Link>
        <Link to="/products?query=jewelery">Jwellery</Link>
        <Link to="/products?query=electronics">Electronics</Link>
      </nav>

      <div className="search-bar">
        <input type="text" placeholder="Search for products..." />
      </div>

      <div className="icons">
        <Link to="/profile" title="Profile">
          <FaUser className="icon" />
        </Link>
        <Link to="/wishlist" title="Wishlist">
          <FaHeart className="icon" />
        </Link>
        <Link to="/bag" title="Bag">
          <FaShoppingBag className="icon" />
        </Link>
        {authState.isLoggedIn && <h5 onClick={handlelogout} style={{cursor: "pointer"}}>{loading ? <ClipLoader /> : "Logout"}</h5>}

      </div>
    </header>
  );
};

export default Header;
