import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                else if (res.status === 401) {
                    history.push('./login');
                }

            })
            .then(data => setOrders(data))
    }, []);

    return (
        <div className="items-container">
            <h1 className="text-center">My Orders : {orders.length}</h1>
            <div>
                {
                    orders.map(order => <div key={order._id}><p>Name: {order.name} Email: {order.email}</p></div>)
                }
            </div>
        </div>
    );
};

export default Orders;