import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

    const handleUpdateName = (e) => {
        const updateName = e.target.value;
        const updateUser = { name: updateName, email: user.email }
        setUser(updateUser);
    }

    const handleUpdateEmail = (e) => {
        const updateEmail = e.target.value;
        // const updateUser = { name: user.name, email: updateEmail }
        const updateUser = { ...user }
        updateUser.email = updateEmail;
        setUser(updateUser);
    }

    const handleUpdateUser = (e) => {
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
                    alert("Update Successfully");
                    setUser({});
                }

            })

        e.preventDefault();
    }

    return (
        <div>
            <h2>Update User</h2>
            <h3>{user.name}  {user.email}</h3>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleUpdateName} type="text" placeholder="Name" value={user.name || ''} /><br />
                <input onChange={handleUpdateEmail} type="text" placeholder="Email" value={user.email || ''} /><br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;