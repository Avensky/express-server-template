import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//import { Route, Switch } from 'react-router-dom';
//import Auxiliary from '../../../../hoc/Auxiliary';
import classes from './ItemFull.module.css';
import * as actions from '../../../../store/actions/index';
//import Details from '../Details/Details';                                                             
import Item from '../Items/Item/Item'

const ItemFull = props => {
    //const [id, setId]       = useState(null);
    const [item, setItem]   = useState(null);
    //console.log('all items ', props.shop)

    const loadData = (paramId) =>{
        // console.log('pong')
        // console.log('all items ', props.shop)
        if (props.shop) {
            const itemId = props.shop.find(el => el._id === paramId);
            setItem(itemId);
        }

    }

    useEffect(() => {
        //console.log('params',props.match.params.itemId)
        if (props.cartLoaded===true){
            //console.log('ping')
            console.log('search for item')
            loadData(props.match.params.itemId)
        } 
    },[props.shop])

    const handleClick           = (id) => {props.addToCart(id); }
    const addToCart             = (id) => {props.addToCart(id)}
    const subtractQuantity      = (id) => {props.subtractQuantity(id);}
    let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
    
    if ( props.match.params.id ) {
        details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    }

    if (item) {
        details = <Item
            class               = 'ItemFull'
            imgClass            = 'ItemFullImg'
            image               = {item.imageData}
            id                  = {item._id}
            key                 = {item._id}
            alt                 = {item.title}
            title               = {item.title}
            link                = {"/shop/itemfull/" + item.id}
            to                  = "/"
            clicked             = {() => handleClick(item.id)}
            addToCart           = {() =>addToCart(item._id)}
            subtractQuantity    = {() =>subtractQuantity(item._id)}
            name                = {item.name}
            desc                = {item.desc}
            price               = {item.price}
            quantity            = {item.amount||0}
            stock               = {item.quantity}
            sold                = {item.sold}
        />
    }
    return(
        <div className='page-wrapper'>
            <div className="text-center">
                <h1><a href='/shop'>Shop</a></h1>
            </div>
            <div className='page-body'>
                {details}
            </div>
        </div>
    )
    
}

const mapStateToProps = state => {
    return {
        items       : state.shop.items,
        addedItems  : state.shop.addedItems,
        total       : state.shop.total,
        shop        : state.shop.shop,
        isAuth      : state.auth.payload,
        cartLoaded  : state.shop.cartLoaded,
        shopLoaded  : state.shop.shopLoaded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ) },
        subtractQuantity    : (id)     =>{ dispatch(actions.subtractQuantity(id))}

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ItemFull);