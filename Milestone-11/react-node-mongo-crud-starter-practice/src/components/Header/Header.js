import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="text-center my-8">
            <span className="border border-gray-300 mr-3 py-1 px-2"><Link to="/">Home</Link></span>
            <span className="border border-gray-300 mr-3 py-1 px-2"><Link to="/adduser">Add User</Link></span>
            <span className="border border-gray-300 mr-3 py-1 px-2"><Link to="/users">Users</Link></span>
        </div>
    );
};

export default Header;