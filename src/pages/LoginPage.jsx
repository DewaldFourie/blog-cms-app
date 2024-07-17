import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        handleLogin();
        navigate('/');
    };

    return (
        <form action="post" onSubmit={login}>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};
export default LoginPage;