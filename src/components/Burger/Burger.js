import React from 'react'
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    let mappedIngredients = Object.keys(props.ingredients)
        .map(ingrdKey => {
            /* First map: Array of empty objects according "Qty" 
            > cheese: 2 -->[ [undefined] [undefined] ]
             Second map: Return JSX with key and type 
             according the number of elements from the 
             First map */
            return [...Array(props.ingredients[ingrdKey])]
                .map((_, index) => {
                    return <BurgerIngredient key={ingrdKey + index} type={ingrdKey} />
                })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (mappedIngredients.length === 0) {
        mappedIngredients = <p>Please add some ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {mappedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(burger); //Now props has routing attributes (match, history...)