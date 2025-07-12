import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <img
        src={"icons-png.flaticon.com/512/2748/2748558.png"} />
      <h1>Oops! Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/products" className="back-home">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
