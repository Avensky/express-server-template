import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './Wrapper.module.css';
import Navbar from '../Navigation/Navbar/Navbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Background from './Background/Background';
import * as actions from '../../store/actions/index';

const Wrapper = props => {
    const [showSidebar, setShowSidebar] = useState(false)
    const closeSidebarHandler = () => {
        setShowSidebar(false)
    }
    
    // set state in a clean way by depending on a previous state
    const sidebarToggleHandler = () => {
        setShowSidebar(!showSidebar);
    }
    
    return (    
        <div className = {classes.Layout}>
            <Background />
            <Navbar 
                isAuth={props.isAuth}
                sidebarToggleClicked={sidebarToggleHandler}
                cart={props.totalItems}
            />
            <Sidebar 
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
        isAuth      : state.auth.payload
    }
}

export default connect ( mapStateToProps, null )( Wrapper )