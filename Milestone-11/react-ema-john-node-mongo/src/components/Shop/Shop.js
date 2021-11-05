import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [displayProducts, setDisplayProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;

    // Data fetch
    useEffect(() => {
        // console.log("Product API called");
        fetch(`http://localhost:5000/products/?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setDisplayProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
                // console.log("Products received");
            });
    }, [page]);

    const handleAddToCart = (product) => {
        const exists = cart.find(item => item.key === product.key);
        let newCart = [];

        if (exists) {
            const rest = cart.filter(item => item.key !== product.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, product];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        // console.log(newCart);
        setCart(newCart);

        // Save to local storage
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProducts = products.filter((product) => {
            if (product.name.toLowerCase().includes(searchText.toLowerCase())) {
                return product;
            }
        });
        // console.log(matchedProducts);
        setDisplayProducts(matchedProducts);
    }

    return (
        <div>
            <div className="search-container">
                <div className="search-bar">
                    <input onChange={handleSearch} type="text" name="" id="" placeholder="Search Product" />
                    <a href="#"><span className="cart-count">0</span></a>
                </div>
            </div>
            <div className="main-container">
                <div className="product-container">
                    {
                        displayProducts.map((product) => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}>
                        </Product>)
                    }
                    <div className="pagination">
                        {
                            [...Array(pageCount).keys()]
                                .map(number => <button
                                    className={number === page ? 'selected' : ''}
                                    key={number}
                                    onClick={() => setPage(number)}
                                >{number + 1}</button>)
                        }
                    </div>
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review"><button className="regular-btn">Order Review</button></Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;