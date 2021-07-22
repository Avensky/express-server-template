import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './Wrapper.module.css';
import Navbar from '../Navigation/Navbar/Navbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Background from './Background/Background';
import * as actions from '../../store/actions/index';

const Wrapper = props => {
    const [showSidebar, setShowSidebar] = useState(false)
    const closeSidebarHandler = () => { setShowSidebar(false) }
    
    // set state in a clean way by depending on a previous state
    const sidebarToggleHandler = () => {setShowSidebar(!showSidebar); }

    useEffect(() => {
        const getItems = async () => { props.getItems() }
        if ( props.items.length === 0){ 
            console.log('Fetching Items')
            getItems() 
        }
    }, [])

    useEffect(() => {
        const loadCart = async () => { props.loadCart() }
        if ( props.items.length>0){ 
            console.log('Fetching Cart')
            loadCart() 
        }
    }, [props.items])

    useEffect(() => {
        const loadShop = async () => { props.loadShop() }
        
        if ( props.items.length>0){ 
            console.log('Fetching Cart')
            loadShop() 
        }
        
    }, [props.items])

    return (    
        <div className = {classes.Layout}>
            <Background />
            <Navbar 
                isAuth={props.isAuth}
                sidebarToggleClicked={sidebarToggleHandler}
                totalItems={props.totalItems}
            />
            <Sidebar 
                totalItems={props.totalItems}
                isAuth={props.isAuth}
                open={showSidebar} 
                closed={closeSidebarHandler} 
            />
            <main className={classes.Wrapper}>
                {props.children}
            </main>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        items             : state.shop.items,
        isAuth      : state.auth.payload,
        totalItems  : state.cart.totalItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItems            : ()     =>{ dispatch(actions.getItems())},
        loadCart            : (cart) =>{ dispatch(actions.loadCart(cart))},
        loadShop            : () =>{ dispatch(actions.loadShop())}
    }
}

export default connect ( mapStateToProps, mapDispatchToProps )( Wrapper )