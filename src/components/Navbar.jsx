import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ isLoggedIn, handleLogout }) => {
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate('/login');
    };


    return (
        <nav>
            <Link to={"/"}>Home</Link>
            {isLoggedIn ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <Link to={'/login'}>Login</Link>
            )}
        </nav>
    )
}

export default Navbar;