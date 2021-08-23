import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ItemDetails.module.css';

//{classes.CardThumbnail}

const item = props => {
    let url
    process.env.NODE_ENV === 'production'
        ? url = 'https://localhost:3000/'
        : url = 'http://localhost:5000/'

    let stock
    if (props.stock>11){
        stock = <p><b>In Stock:</b> 10+</p>
    }
    if  ( props.stock < 11 && props.stock > 0 ) {
        stock = <p><b>In Stock:</b> {props.stock}</p>
    }
    if (props.stock===0){
        stock = <p><b>Out of stock:</b></p>
    }

    let rating, star_border, star,star_half

    star_border = <i className="material-icons">star_border</i>
    star = <i className="material-icons">star</i>
    star_half = <i className="material-icons">star_half</i>

    rating = [star,star,star,star_half,star_border]
    return  (
    <div className={[classes.Item, props.class].join(' ')} key={props.id}>
        <div className={props.myClass}>   
            {/* Image */}
            <div className={classes.CardThumbnail}>
                <Link to={'/shop/itemfull/' + props.id}>
                    <img className={props.imgClass} src={url+props.image} alt={props.alt}/>
                </Link>
            </div>
        </div>
        <div className={props.myClass}> 
            {/* Name */}
            <div className={[classes.CardName, props.class, 'CardName'].join(' ')}>
                <b><p>{props.name}</p></b>
            </div> 

            {/* Description */}
            <div className={[classes.CardDescription, props.class].join(' ')}>
                <p >{props.desc}</p>
            </div>

            {/* Price */}
            <div className={classes.Cardprice}>
                <p >${props.price.toFixed(2)}</p>
            </div>

            {/* Reviews */}
            <div className={classes.CardReviews}>
                <p className={classes.CardTitle}>{rating} Reviews({props.reviews || 0})</p>
            </div>

            {/* Quantity */}
            <div className={classes.CardQuantityWrapper}>
                <b><p>Quantity</p></b>
                <div className={classes.CardQuantity}>
                    <i className={["material-icons", classes.MaterialIcons, classes.Arrow].join(' ')} 
                        onClick={props.subtractQuantity}>arrow_drop_down</i>
                    <p>{props.quantity}</p>
                    <i className={["material-icons", classes.MaterialIcons, classes.Arrow].join(' ')} 
                        onClick={props.addToCart}>arrow_drop_up</i>  
                </div>
            </div>

            {/* Stock */}
            <div className={classes.CardStock}>
                { stock }
            </div>

            {/* Sold */}
            <div className={classes.CardSold}>
                <p>Sold: {props.sold}</p>
            </div>

            {/* Price */}
            <div className={classes.CardPriceWrapper} onClick={props.addToCart}>
                <div className={["text-center noselect", classes.CardPrice].join(' ')}><p>Add to Cart <b>${props.price.toFixed(2)}</b></p></div>
            </div>
        </div>
    </div>
)}
export default item;