import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button className='submit' onClick={props.onClick}>{props.placeholder}</button>
    )
}

export { Button };