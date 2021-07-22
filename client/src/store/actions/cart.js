import axios from 'axios'
import * as actionTypes from './actionTypes'

//add cart action
export const addToCart= (id)=>{
    return{
        type: actionTypes.ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem=(id)=>{
    console.log('removeItem id = '+ id)
    return{
        type: actionTypes.REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: actionTypes.SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity=(id)=>{
    return{
        type: actionTypes.ADD_QUANTITY,
        id
    }
}

export const loadCart = ( values ) => {
    // local storage
    console.log('loading cart')
    return{
        type: actionTypes.LOAD_CART,
    }
}