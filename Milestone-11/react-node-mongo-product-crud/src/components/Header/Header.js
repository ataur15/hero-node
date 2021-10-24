import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/addproduct">Add Product</Link>
        </div>
    );
};

export default Header;