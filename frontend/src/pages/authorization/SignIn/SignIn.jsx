import React from 'react';
import {Link} from "react-router-dom";

const LogIn = () => {
    return (
        <div className=''>
            <h1>Log in</h1>
            <form action method="post" className='log-in-form'>
                <input type="email" placeholder="Type email"/>
                <br/>
                <input type="password" placeholder="Type password"/>
                <br/>
                <button>Log in</button>
            </form>
            <p className='my-3'>
                Don`t have an account?&thinsp;
                <Link to='/authorize/sign-in'>Sign in</Link>
            </p>
        </div>
    );
};

export default LogIn;