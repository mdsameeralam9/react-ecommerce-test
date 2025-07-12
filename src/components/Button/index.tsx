import React from 'react';
import './button.scss';

const Button = ({ label="Login" }) => {
  return (
    <button type="submit">{label}</button>
  )
}

export default Button