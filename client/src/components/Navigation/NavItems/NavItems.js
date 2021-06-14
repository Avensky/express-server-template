import React from 'react';
import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem';

const navItems = ( props ) => (
    <ul className={classes.NavItems}>
        <NavItem link="/home"          exact>Home</NavItem>
        {props.isAuthenticated != null ? <NavItem link="/profile"          >Profile</NavItem> : null}
        {!props.isAuthenticated
            ? <NavItem link="/authentication"   >Cotact &amp; Sign-Up</NavItem>
            : <div className={classes.NavItem}><a  href="/auth/logout">Logout</a></div>}
    </ul>
);

export default navItems;