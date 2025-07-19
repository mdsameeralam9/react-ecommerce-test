import React from 'react';
import './input.scss';

const Input = ({ onChange = () => { }, value = "", name="", label = "Email", id = "email", type = "text", placeholder = "Enter your email", error={} }) => {
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
                name={name}
                required
            />
            {error?.[name] && <p>not a valid input</p>}
        </>
    )
}

export default Input