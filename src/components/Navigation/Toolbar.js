import React from 'react'
import Logo from '../Logo/Logo';
import NavigationItems from './Items/Items';
import classes from './Toolbar.css';
import Menu from '../Navigation/Menu';

const toolbar = (props) => (<header className={classes.Toolbar}>
    <Menu click={props.open}/>
    <Logo />
    <nav className={classes.DesktopOnly}>
        <NavigationItems />
    </nav>
</header>);

export default toolbar;
