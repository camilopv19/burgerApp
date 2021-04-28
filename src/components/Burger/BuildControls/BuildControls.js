import React from 'react';
import classes from './BuildControls.css';
import Control from './Control/Control';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <Control
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientHndlr(true, ctrl.type)}
                removed={() => props.ingredientHndlr(false, ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
            >ORDER NOW</button>
    </div>
);

export default buildControls;