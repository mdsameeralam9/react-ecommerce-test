import React from 'react';
import './input.scss';

const Input = ({ onChange = () => { }, value = "", label = "Email", id = "email", type = "text", placeholder = "Enter your email" }) => {
    return (
        <>
            <label className='_label' htmlFor={id}>{label}</label>
            <input
                className='_input'
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
        </>
    )
}

export default Input