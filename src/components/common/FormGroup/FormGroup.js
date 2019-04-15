import React from 'react';
import './FormGroup.css';

const FormGroup = (props) => {
    return (
        <div className='fomrGroup'>{props.children}</div>
    )
}

export { FormGroup };