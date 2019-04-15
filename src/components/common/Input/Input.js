import React from 'react';
import './Input.css';

const Input = (props) => {
    const style = props.alert ? 'alert' : 'container';
    return (
        <div className={style}>
            <input 
                type={props.type}
                name={props.name} 
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    )
}

export { Input };