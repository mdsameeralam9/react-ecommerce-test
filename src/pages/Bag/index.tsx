import React, { useState } from "react";
import "./Cart.scss";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  details?: string;
};

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Pi Pizza Oven",
    price: 469.99,
    quantity: 1,
    details: "Estimated Ship Date: June 6th • Fuel Source: Wood Only",
  },
  {
    id: 2,
    name: "Solo Stove Grill Ultimate Bundle",
    price: 549.99,
    quantity: 1,
    details: "Add accident protection for $29.99",
  },
  {
    id: 3,
    name: "Solo Stove Starters (4 pack)",
    price: 0.0,
    quantity: 1,
  },
  {
    id: 4,
    name: "Solo Stove Charcoal Grill Pack",
    price: 0.0,
    quantity: 1,
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const [coupon, setCoupon] = useState("");

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div className="cart-page">
      <h2>Your Cart ({cartItems.length} items)</h2>
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
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="item-name">{item.name}</div>
                {item.details && <div className="item-details">{item.details}</div>}
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Sales Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-row coupon-row">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button>Apply</button>
        </div>
        <div className="summary-row total-row">
          <strong>Grand Total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <p className="free-shipping">🎉 Congrats, you're eligible for Free Shipping.</p>
        <button className="checkout-btn">Check out</button>
      </div>
    </div>
  );
};

export default Cart;
