import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary';
import SideDrawer from '../Navigation/SideDrawer';
import Toolbar from '../Navigation/Toolbar';
import classes from './Layout.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHndlr = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerOpenHndlr = () => {
        this.setState( (prevState)=>{
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar open={this.sideDrawerOpenHndlr}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHndlr} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}


export default Layout;          