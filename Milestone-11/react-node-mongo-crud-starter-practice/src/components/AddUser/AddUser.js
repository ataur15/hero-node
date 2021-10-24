import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const newUser = { name, email }

        fetch('http://localhost:5000/users/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully user added');
                    e.target.reset();
                }
            })
    }

    return (
        <div className="max-w-xs m-auto">
            <h2 className="text-center py-4 text-2xl font-medium">Add New User</h2>
            <form onSubmit={handleAddUser}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md mb-2" htmlFor="Name">Name</label>
                    <input type="text" ref={nameRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md mb-2" htmlFor="Email">Email</label>
                    <input type="email" ref={emailRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" required />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUser;