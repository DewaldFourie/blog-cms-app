import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const errorMessage = await handleLogin(username, password);
        if (errorMessage) {
            setError(errorMessage);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="login-container">
            <form action="post" onSubmit={login}>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            {error && 
                <div className="error-message">{error}</div>
            }
        </div>
    );
};
export default LoginPage;