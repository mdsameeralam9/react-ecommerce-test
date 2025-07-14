import React from 'react';
import './button.scss';
import { ClipLoader } from 'react-spinners';



const Button = ({ label="Login", loading=false }) => {
  return (
    <button disabled={loading} type="submit">{loading ? <span className='loader_css'> <ClipLoader /> Loading...</span> : label}</button>
  )
}

export default Button