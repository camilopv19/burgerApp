import React from 'react'
import Logo from '../Logo/Logo';
import NavigationItems from './Items/Items';
import classes from './SideDrawer.css';
import BackDrop from '../UI/Backdrop/BackDrop';
import Aux from '../../hoc/Auxiliary';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];
    
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
}

export default sideDrawer;
