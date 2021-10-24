import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, []);

    const handleName = (e) => {
        const updateName = e.target.value;
        const existingUser = { ...user };
        existingUser.name = updateName;
        setUser(existingUser);
    }

    const handleEmail = (e) => {
        const updateEmail = e.target.value;
        const existingUser = { ...user };
        existingUser.email = updateEmail;
        setUser(existingUser);
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Successfully Updated');
                    setUser({});
                }
            })
    }

    return (
        <div className="max-w-xs m-auto">
            <h2 className="text-center py-4 text-2xl font-medium">Update User</h2>
            <form onSubmit={handleUpdateUser}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md mb-2" htmlFor="Name">Name</label>
                    <input type="text" onChange={handleName} value={user.name || ''} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md mb-2" htmlFor="Email">Email</label>
                    <input type="email" onChange={handleEmail} value={user.email || ''} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" required />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;