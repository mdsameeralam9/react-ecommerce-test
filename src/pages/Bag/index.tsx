import React from "react";
import "./Cart.scss";
import { useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import { axiosInstance, axiosPrivateInstance } from "../../services/APIConfig";


const Cart: React.FC = () => {
  const { cart = [], length = 0, totalPrice = 0 } = useSelector(state => state.cart);

  const updateQuantity = () => {
  };

  //makePayment
  const makePayment = async () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    // pass data product
    const body = {
      products: cart.map((item, index) => ({ ...item, price: index + 1, quantity: 1 }))
    };

    // header to strigify body data
    const headers = {
      'Content-type': 'application/json'
    }

    const responseAPi = await fetch("http://localhost:3000/api/create-payment-intent", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })

    const session = await responseAPi.json();
    const result = stripePromise?.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      console.log("result ===>", result)
    }
  }

  return (
    <div className="cart-page">
      <h2>Your Cart ({length} items)</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td style={{ display: "flex", gap: "5px" }}>
                <img src={item?.image} width={"40px"} height={"60px"} />
                <div className="infoDetai">
                  <div className="item-name">{item.category}</div>
                  {item.title && <div className="item-details">{item.title}</div>}
                </div>

              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{1}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </td>
              <td>${(item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Sales Tax</span>
          <span>${"0.00"}</span>
        </div>
        <div className="summary-row total-row">
          <strong>Grand Total</strong>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
        <p className="free-shipping">🎉 Congrats, you're eligible for Free Shipping.</p>
        <button className="checkout-btn" onClick={makePayment}>Check out</button>

      </div>
    </div>
  );
};

export default Cart;
