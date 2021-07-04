import React from 'react';
import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem';

const navItems = ( props ) => (
    <ul className={classes.NavItems}>
        <NavItem link="/home"          exact>Home</NavItem>
        <NavItem link="/shop"           exact>Purchase</NavItem>
        {props.isAuthenticated != null ? <NavItem link="/profile"          >Profile</NavItem> : null}
        {!props.isAuthenticated
            ? <NavItem link="/authentication"   >Cotact &amp; Sign-Up</NavItem>
            : <div className={classes.NavItem}><a  href="/api/logout">Logout</a></div>}

        <NavItem  link="/cart" myClass={classes.line}>
            <span className={["fa", classes.fa, "fa-shopping-cart", classes.inline].join(' ')}/>
            <p className={classes.inline}>({props.cart})</p>
        </NavItem > 
    
    </ul>
);

export default navItems;