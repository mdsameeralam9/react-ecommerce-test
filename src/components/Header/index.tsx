import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import './header.scss';

const Header = () => {
  return (
    <header className="main-header">
      <div className="brand">
        <Link to="/">
          {/* <img src="/logo.png" alt="Brand Logo" /> */}
          Shop Online
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
        <Link to="/kids">Kids</Link>
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
      </div>
    </header>
  );
};

export default Header;
