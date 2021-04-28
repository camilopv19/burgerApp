import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../hoc/Auxiliary";
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import errorHndlr from '../hoc/ErrorHndlr';
import * as actionTypes from '../store/actions';

class BurgerBuilder extends Component {
    state = {
        loading: false,
        purchasing: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        // const ingredients = axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     });

    }
   
    updatePurchase(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);


        return sum > 0;
    }

    purchaseHndlr = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHndlr = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaseHndlr = () => {
        // const queryParams = [];

        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' 
        //     + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);

        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: queryString //Didn't need to concat the '?' char
        // });
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ?
            <p style={{ textAlign: 'center' }}>Ingredient's couldn't be loaded</p> :
            <Spinner />;


        if (this.props.ings) {
            burger = (<Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientHndlr={this.props.onIngredientModified}
                    purchasable={this.updatePurchase(this.props.ings)}
                    disabled={disabledInfo}
                    ordered={this.purchaseHndlr}
                    price={this.props.price}
                />
            </Aux>);

            orderSummary = (<OrderSummary
                ingredients={this.props.ings}
                cancelPurchase={this.cancelPurchaseHndlr}
                continuePurchase={this.continuePurchaseHndlr}
                price={this.props.price.toFixed(2)}
            />)
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.cancelPurchaseHndlr}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientModified: (willAdd, ingName) => {
            let payload = {
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingName 
            };
            if (!willAdd) {
                payload.type = actionTypes.REMOVE_INGREDIENT
            } 
            return dispatch(payload)},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHndlr(BurgerBuilder, axios));