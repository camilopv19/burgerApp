import React from 'react'
import classes from './Button.css'


const button = (props) => {
    const allClasses = [classes.Button, classes[props.btnType]].join(' ');
    return (
        <button
            className={allClasses}
            onClick={props.clicked}
            disabled={props.disabled}>{props.children}</button>
    );
}

export default button;
