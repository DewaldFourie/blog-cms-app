import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ isLoggedIn, handleLogout, authorUsername }) => {
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate('/login');
    };


    return (
        <nav>
            <Link to={"/"}>Home</Link>
            {isLoggedIn ? (
                <>
                    <span>Welcome, {authorUsername}</span>
                    <button onClick={logout}>Logout</button>
                </>           
            ) : (
                <Link to={'/login'}>Login</Link>
            )}
        </nav>
    )
}

export default Navbar;