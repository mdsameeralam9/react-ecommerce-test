import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import './header.scss';
import { getAuthUser } from '../../contex/Auth';

const Header = () => {
  const { setAccessToken, setIsLoggedIn, isLoggedIn } = getAuthUser();
  const handlelogout = () => {
    setAccessToken('')
    setIsLoggedIn(false)
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
        {isLoggedIn && <h5 onClick={handlelogout}>Logout</h5>}

      </div>
    </header>
  );
};

export default Header;
