import React, { useEffect, useState } from 'react';
import './products.css';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted successfully');
                        const remainingProdcut = products.filter(product => product._id !== id);
                        setProducts(remainingProdcut);
                    }
                })
        }
    }

    return (
        <div>
            <h1>Products</h1>
            <div className="products">
                {
                    products.map(product => <div className="product" key={product._id}>
                        <h4>Name: {product.productName}</h4>
                        <p>Price: {product.productPrice}</p>
                        <p>Quantity: {product.productQuantity}</p>
                        <Link to={`/update/${product._id}`}><button>Edit</button></Link> <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Products;