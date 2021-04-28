import React from 'react';
import classes from './Item.css';
import { NavLink } from 'react-router-dom';


const navigationItem = (props) => {
    // const clss = props.active ? classes.active : null;

    return (
        <ul className={classes.NavigationItem}>
            <li>
                <NavLink
                    to={props.link}
                    activeClassName={classes.active}
                    exact={props.exact}
                >{props.children}</NavLink></li>
        </ul>
    );
}

export default navigationItem;