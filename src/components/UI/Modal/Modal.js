import React, { Component } from 'react'
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import BackDrop from '../Backdrop/BackDrop';

class Modal  extends Component {

    //PureComponent would check for more props
    shouldComponentUpdate(nextProps, nextState){
            return nextProps.show !== this.props.show || nextProps.children !== this.props.children; //False: Don't update elements
        
    }

    render(){
        const style = {
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
        };
        return (
            <Aux>
                <BackDrop
                    show={this.props.show}
                    clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={style}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;