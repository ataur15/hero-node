import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    // const { user, logout } = useFirebase();
    const { user, logout } = useAuth();
    return (
        <div className="header">
            <img className="logo" src={logo} alt="" />
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/review">Order Review</Link></li>
                    <li><Link to="/inventory">Manage Inventory</Link></li>
                    {user.email &&
                        <li><Link to="/orders">My Orders</Link></li>
                    }
                    {user.email ? <button onClick={logout}>Logout</button> : <li><Link to="/login">Login</Link></li>}
                </ul>
            </nav>
        </div>
    );
};

export default Header;