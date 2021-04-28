import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';
import Aux from './Auxiliary';

const errorHndlr = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor(){
            super();
            this.reqInterceptor = axios.interceptors.request.use( req =>{
                this.setState({error: null});
                return req;
            });

            this.reqInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({error})
            });
        }

        componentWillUnmount(){
            //When this component isn't required anymore: Using routes i.e.
            //axios instance should be stored in the state: reqInterceptor
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqInterceptor);
        }

        errorConfirmedHndler = () =>{
            this.setState({error: null});
        }

        render(){
            return(
                <Aux>
                    <Modal 
                    modalClosed={this.errorConfirmedHndler}
                    show={this.state.error}
                    >
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default errorHndlr;