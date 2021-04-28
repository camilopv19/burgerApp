import React, { Component } from 'react';
import axios from '../../axios-orders';
// import styled from 'styled-components';
import Order from './Order';
import errorHandler from '../../hoc/ErrorHndlr';

// const SDiv = styled.div``;

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                let fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                // console.log(fetchedOrders);
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {
        return (<div>
            {this.state.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))}
        </div>)
    }
}

export default errorHandler(Orders, axios);