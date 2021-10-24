import React, { useRef } from 'react';

const AddProduct = () => {
    const refName = useRef();
    const refPrice = useRef();
    const refQuantity = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = refName.current.value;
        const price = refPrice.current.value;
        const quantity = refQuantity.current.value;
        const newProduct = { productName: name, productPrice: price, productQuantity: quantity };

        fetch(`http://localhost:5000/products`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully product added');
                    e.target.reset();
                }
            })
    }

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={refName} placeholder="Name" /><br />
                <input type="text" ref={refPrice} placeholder="Price" /><br />
                <input type="text" ref={refQuantity} placeholder="Quantity" /><br />
                <input type="submit" value="Add Product" />
            </form>
        </div>
    );
};

export default AddProduct;