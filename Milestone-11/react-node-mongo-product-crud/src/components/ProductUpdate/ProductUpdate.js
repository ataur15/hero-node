import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ProductUpdate = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert("Update Successfully");
                    setProduct({});
                }
            })

    }

    const handleName = (e) => {
        const updateName = e.target.value;
        const updateProduct = { ...product }
        updateProduct.productName = updateName;
        setProduct(updateProduct);
    }

    const handlePrice = (e) => {
        const updatePrice = e.target.value;
        const updateProduct = { ...product }
        updateProduct.productPrice = updatePrice;
        setProduct(updateProduct);
    }

    const handleQuantity = (e) => {
        const updateQuantity = e.target.value;
        const updateProduct = { ...product }
        updateProduct.productQuantity = updateQuantity;
        setProduct(updateProduct);
    }

    return (
        <div>
            <h1>Update Product</h1>
            <form onSubmit={handleUpdate}>
                <input onChange={handleName} type="text" placeholder="Name" value={product.productName || ''} /><br />
                <input onChange={handlePrice} type="text" placeholder="Price" value={product.productPrice || ''} /><br />
                <input onChange={handleQuantity} type="text" placeholder="Quantity" value={product.productQuantity || ''} /><br />
                <input type="submit" value="Update Product" />
            </form>
        </div>
    );
};

export default ProductUpdate;