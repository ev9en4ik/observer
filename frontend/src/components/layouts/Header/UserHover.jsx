import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const UserHover = ({isHovering}) => {
    const Navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userData'));
    const logOut = () => {
        localStorage.clear();
        Navigate("/")
    }

    return (
        isHovering && (
            <div
                className="absolute flex justify-around items-center flex-col top-4 w-32 h-24 bg-neutral-800 rounded-lg text-gray-400">
                <span className='cursor-default'>{user.Login}</span>
                <Link to={`/profile`}
                      className='hover:text-pink-300 transition-colors  ease-in-out duration-300'>
                    Edit
                </Link>
                <button
                    className='hover:text-pink-300 transition-colors  ease-in-out duration-300'
                    onClick={() => logOut()}>Log out
                </button>
            </div>
        )
    );
};

export default UserHover;