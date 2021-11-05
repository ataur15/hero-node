import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="main">
            <h1>Register</h1>
            <form action="">
                <div>
                    <div><label htmlFor="Email">Email</label></div>
                    <input type="email" name="" id="" />
                </div>
                <div>
                    <div><label htmlFor="Password">Password</label></div>
                    <input type="password" name="" id="" />
                </div>
                <div>
                    <div><label htmlFor="Confirm Password">Confirm Password</label></div>
                    <input type="password" name="" id="" />
                </div>
                <div>
                    <input className="regular-btn" type="submit" value="Submit" />
                </div>
            </form>
            <div><Link to="/login">Already you have an account</Link></div>
        </div>
    );
};

export default Register;