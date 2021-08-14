import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//import { Route, Switch } from 'react-router-dom';
import Auxiliary from '../../../../hoc/Auxiliary';
import classes from './ItemFull.module.css';
import * as actions from '../../../../store/actions/index';
//import Details from '../Details/Details';                                                             
import Item from '../Items/Item/Item'

const ItemFull = props => {
    const [id, setId]       = useState(null);
    const [item, setItem]   = useState(null);
    console.log('all items ', props.shop)

    const loadData = (paramId) =>{
        console.log('pong')
        console.log('all items ', props.shop)
        const itemId = props.shop.find(el => el._id === paramId);
        setItem(itemId);
        console.log('selected item ', itemId)
    }

    useEffect(() => {
        console.log('ping')
        //console.log('params',props.match.params.itemId)
        if (!item){
            loadData(props.match.params.itemId)
        } 
    },[props.match.params, props.shop])

    const handleClick=(id)=>{props.addToCart(id); }
    let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
    
    if ( props.match.params.id ) {
        details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    }

    if (item) {
        details = <Item
            class   = 'classes.DetailsItem'
            image     = {item.imageData}
            id      = {item.id}
            key     = {item.id}
            alt     = {item.title}
            title   = {item.title}
            link    = {"/shop/itemfull/" + item.id}
            to      = "/"
            clicked = {() => handleClick(item.id)}
            desc    = {item.desc}
            price   = {item.price}
            className="Delete"
        />
    }
    return(
        <div className='page-wrapper'>
            <div className="text-center">
                <h1><a href='/shop'>Shop</a></h1>
            </div>
            <div className='page-body'>
                <div className={classes.Item}>
                    {details}
                </div>
            </div>
        </div>
    )
    
}

const mapStateToProps = state => {
    return {
        items       : state.shop.items,
        total       : state.shop.total,
        shop        : state.shop.shop,
        isAuth      : state.auth.payload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ) }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ItemFull);