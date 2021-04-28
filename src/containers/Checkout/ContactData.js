import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import styled from 'styled-components';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const SDiv = styled.div`
    margin: 20px auto;
    width: 80%;
    text-align: center;
    box-shadow: 0 2px 3px #ccc;
    border: 1px solid #eee;
    padding: 10px;
    box-sizing: border-box;

    @media(min-width: 600px){
        width: 500px;
    }
`;

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLengh: 5,
                    maxLengh: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }
    orderHndlr = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {};

        for (const formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId];
        }
        const price = Number.parseInt(this.props.price, 2);
        const order = {
            ingredients: this.props.ings,
            price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => { this.setState({ loading: false }) });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLengh) {
            isValid = value.length >= rules.minLengh && isValid;
        }

        if (rules.maxLengh) {
            isValid = value.length <= rules.maxLengh && isValid;
        }
        return isValid;
    }

    inputChangedHndlr = (event, inputId) => {
        const updatedForm = {
            ...this.state.orderForm
        }

        const updatedElement = {
            ...updatedForm[inputId]
        }

        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedForm[inputId] = updatedElement;

        let formIsValid = true;
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid;
        }
        this.setState({ orderForm: updatedForm, formIsValid: formIsValid });

    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (<form onSubmit={this.orderHndlr}>
            {formElements.map(element => (
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid && element.config.touched}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                    changed={(event) => this.inputChangedHndlr(event, element.id)} />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <SDiv>
                <h4>Enter your contact data</h4>
                {form}
            </SDiv>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
