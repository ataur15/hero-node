import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Get data from local storage
        const savedCart = getStoredCart();
        const keys = Object.keys(savedCart);

        fetch(`http://localhost:5000/products/bykeys`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {
                // console.log(products);
                if (products.length) {
                    const storedCart = [];
                    for (const key in savedCart) {
                        // console.log(key, savedCart[key]);
                        const addedProduct = products.find(product => product.key === key);
                        // console.log(key, addedProduct);
                        if (addedProduct) {
                            const quantity = savedCart[key];
                            addedProduct.quantity = quantity;
                            // console.log(addedProduct);
                            storedCart.push(addedProduct);
                        }
                    }
                    setCart(storedCart);
                }
            })

    }, []);

    return [cart, setCart];
}

export default useCart;