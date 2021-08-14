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
        const getItems = () => { props.getItems() }
        if ( props.items.length === 0){ 
            console.log('get items')
            getItems() 
        }
    }, [])

    useEffect(() => {
        const loadCart = () => { props.loadCart() }
        if ( props.items.length>0){
            console.log('load items')
            loadCart() 
        }
    }, [props.items])

    useEffect(() => {
        const loadShop =  (orderby) => { 
            props.loadShop(orderby) 
        }
        if ( props.shop.length>0){ 
            console.log('load shop')
            loadShop(props.orderby) 
        }
        
    }, [props.orderby])

    return (    
        <div className = {classes.Layout}>
            
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
        items            : state.shop.items,
        shop             : state.shop.shop,
        isAuth           : state.auth.payload,
        totalItems       : state.shop.totalItems,
        orderby          : state.shop.orderby
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItems            : () =>{ dispatch(actions.getItems())},
        loadCart            : () =>{ dispatch(actions.loadCart())},
        loadShop            : () =>{ dispatch(actions.loadShop())}
    }
}

export default connect ( mapStateToProps, mapDispatchToProps )( Wrapper )