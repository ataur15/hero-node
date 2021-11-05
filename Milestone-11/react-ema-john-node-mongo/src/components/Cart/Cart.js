import React, { useReducer } from 'react';
import './Cart.css';

const Cart = (props) => {
    // console.log(props);
    const { cart } = props;

    let total = 0;
    let totalQuantity = 0;
    for (const product of cart) {
        // console.log(product);
        if (!product.quantity) {
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    // const totalReducer = (previous, current) => previous + current.price;
    // let total = cart.reduce(totalReducer, 0);

    let shipping = total > 0 ? 20 : 0;
    let grandTotal = total + shipping;

    return (
        <div>
            {/* <h3>Items Orderd: {props.cart.length}</h3> */}
            <h3>Items Orderd: {totalQuantity}</h3>
            <p>Items: ${total}</p>
            <p>Shipping: ${shipping}</p>
            <h2 className="total">Total: ${grandTotal}</h2>
            {props.children}
        </div>
    );
};

export default Cart;