import React from 'react';
import './style.scss';

const PaymentSuccess = () => {
  return (
    <div className="payment-status success">
      <div className="icon">✅</div>
      <h1>Payment Successful</h1>
      <p>Thank you for your purchase! Your transaction has been completed.</p>
    </div>
  );
};

export default PaymentSuccess;
