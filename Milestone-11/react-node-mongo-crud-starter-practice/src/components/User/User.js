import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useData from '../../hooks/useData';

const User = (props) => {
    const { _id, name, email } = props.user;
    const [users, setUsers] = useData();

    const handleDeleteUser = (id) => {
        const procced = window.confirm('Are you sure, you want to delete?');
        if (procced) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingUser = users.filter(user => user._id !== id);
                        setUsers(remainingUser);
                        // setTrigger(!trigger);
                        alert('Deleted Successfully');
                    }
                })
        }

    }

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {name}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/user/${_id}`}><button className="mr-3 text-blue-600 hover:text-blue-800">Edit</button></Link>
                <button onClick={() => handleDeleteUser(_id)} className="text-red-600 hover:text-red-800">Delete</button>
            </td>
        </tr>
    );
};

export default User;