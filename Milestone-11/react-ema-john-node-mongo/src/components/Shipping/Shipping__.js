import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { getStoredCart } from '../../utilities/fakedb';

const Shipping = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const savedCart = getStoredCart();
        data.order = savedCart;

        fetch(`http://localhost:5000/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Your order processed');
                    reset();
                }
            })

    };

    return (
        <div className="main">
            <h1>Shipping</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div><label>Name</label></div>
                    <input defaultValue={user.displayName} {...register("name")} />
                </div>
                <div>
                    <div><label>Email</label></div>
                    <input defaultValue={user.email} {...register("email", { required: true })} />
                </div>
                <div><p className="error">{errors.email && <span>This field is required</span>}</p></div>
                <div>
                    <div><label>City</label></div>
                    <input {...register("city")} />
                </div>
                <div>
                    <div><label>Phone Number</label></div>
                    <input {...register("Phone Number")} />
                </div>
                <div>
                    <div><label>Address</label></div>
                    <textarea {...register("address")} cols="30" rows="5"></textarea>
                </div>
                <p><input type="submit" /></p>
            </form>
        </div>
    );
};

export default Shipping;