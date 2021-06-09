import React from 'react';
import classes from './Navbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';

const navbar = ( props ) => {
    let cart;         
    if (props.cart) {
        cart = (
            <NavLink  to="/cart" className={classes.line}> 
                <span className={["fa", "fa-shopping-cart", classes.left, classes.inline].join(' ')}/>
                <h3 className={classes.inline}>({props.cart})</h3>
            </NavLink > 
        )
    }
    
    return (
        <div className={classes.Navbar}>
            <SidebarToggle clicked={props.sidebarToggleClicked} />   
            <div className={[classes.MobileLinks, classes.Mobile].join(' ')}>
                <h2 className={classes.line}>
                    {props.isAuth !== null
                        ? <div className={classes.NavItem}><a  href="/auth/logout">Logout </a></div>
                        : null}          
                    {cart}
                    {props.isAuth !== null
                        ? <NavLink to="/profile"   ><h2><span className="fa fa-user" /></h2></NavLink>
                        :<NavLink to="/authentication"   ><h2><span className="fa fa-sign-in" /></h2></NavLink>}                                      
                </h2>
                <div className={[classes.Logo, classes.Mobile].join(' ')}>
                    <NavLink  to="/">
                        <div className={classes.Logo}>
                            <Logo />
                        </div>  
                
                    </NavLink >
                </div>
            </div>
            <div className={classes.DesktopOnly}>
                <NavItems isAuthenticated={props.isAuth} cart={props.cart}/>
            </div>
        </div>
    )
}


export default navbar;