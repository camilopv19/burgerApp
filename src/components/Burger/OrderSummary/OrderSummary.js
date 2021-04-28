import React, { Component} from 'react'
import Aux from '../../../hoc/Auxiliary';
import Button from '../../../components/UI/Button/Button';

class OrderSummary extends Component {
    
    render() {
        const style = { textTransform: 'capitalize' };
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={style}>{igKey}</span>:
                        {this.props.ingredients[igKey]}
                    </li>);
            });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger has the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>Total price: <strong>$ {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;