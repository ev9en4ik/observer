import React from 'react';
import {Link} from "react-router-dom";

const SignIn = () => {
    return (
        <div>
            <h1>Sign in</h1>
            <form action method="post">
                <input type="text" placeholder="Type name"/>
                <input type="text" placeholder="Type lastname"/>
                <input type="email" placeholder="Type email"/>
                <input type="password" placeholder="Type password"/>
                <button>Sign in</button>
            </form>
            <p className='my-3'>
                Already have an account?&thinsp;
                <Link to='/authorize/log-in'>Log in</Link>
            </p>
        </div>
    );
};

export default SignIn;