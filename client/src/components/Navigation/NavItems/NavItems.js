import React from 'react';
import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem';

const navItems = ( props ) => (
    <ul className={classes.NavItems}>
        <NavItem link="/home"          exact>Home</NavItem>
        <NavItem link="/shop"           exact>Purchase</NavItem>
        {props.isAuthenticated != null ? <NavItem link="/profile"          >Profile</NavItem> : null}
        {props.isAuthenticated != null ? <NavItem link="/orders"          >Orders</NavItem> : null}
        {!props.isAuthenticated
            ? <NavItem link="/authentication"   >Cotact &amp; Sign-Up</NavItem>
            : <div className={classes.NavItem}><a  href="/api/logout">Logout</a></div>}

        <NavItem  link="/cart" >
            <span className={["fa", classes.fa, "fa-shopping-cart", classes.inline].join(' ')}/>
            {props.totalItems
                ?<p className={classes.inline}>({props.totalItems})</p>
                : null
            }
            
        </NavItem > 
    
    </ul>
);

export default navItems;