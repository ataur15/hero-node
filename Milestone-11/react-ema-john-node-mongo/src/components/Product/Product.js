import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
    // console.log(props);
    const { name, img, seller, price, stock, star } = props.product;
    // const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    return (
        <div className="items-container">
            <div className="item">
                <div className="product-img">
                    <img src={img} alt="" />
                </div>
                <div className="product-info">
                    <h3 className="item-header">{name}</h3>
                    <p>by: {seller}</p>
                    <p className="instock">In Stock: {stock}</p>
                    <p className="price"><b>${price}</b></p>
                    <div>
                        <Rating
                            initialRating={star}
                            emptySymbol="far fa-star"
                            fullSymbol="fas fa-star"
                            readonly
                        />
                    </div>
                    <button onClick={() => props.handleAddToCart(props.product)} className="regular-btn"><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Product;