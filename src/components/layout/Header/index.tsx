import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import './header.scss';
import { axiosInstance } from '../../../services/APIConfig';
import { ClipLoader } from 'react-spinners';
import useAuth from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import BrandImg from "../../../assets/Images/brand.png"

const Header = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {  setAuthState, authState } = useAuth();
  const { length=0 } = useSelector(state => state.cart);

  console.log(" length ", length)

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
        <Link to="/products" style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <img src={BrandImg} alt="Brand Logo" />
          {/* <span>Shop Online</span> */}
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/products?query=men">Men</Link>
        <Link to="/products?query=women">Women</Link>
        <Link to="/products?query=jewellery">Jwellery</Link>
        <Link to="/products?query=laptop">Laptops</Link>
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
        <Link to="/bag" title="Bag" style={{position: "relative"}}>
          <FaShoppingBag className="icon" />
          <span style={{position: "absolute", top: "-7px"}}>{length}</span>
        </Link>
        {authState.isLoggedIn && <h5 onClick={handlelogout} style={{cursor: "pointer"}}>{loading ? <ClipLoader /> : "Logout"}</h5>}

      </div>
    </header>
  );
};

export default Header;
