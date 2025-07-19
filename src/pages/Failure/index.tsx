import React from 'react';
import './style.scss';

const PaymentFailure = () => {
  return (
    <div className="payment-status failure">
      <div className="icon">❌</div>
      <h1>Payment Failed</h1>
      <p>Oops! Something went wrong. Please try again or contact support.</p>
    </div>
  );
};

export default PaymentFailure;
