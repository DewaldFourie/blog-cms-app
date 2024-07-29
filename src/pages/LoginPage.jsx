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
        <div className="loginPage-content">
            <div className="loginPage-container">
                <div className="loginPage-row">
                    <div className="loginPage-col-lg-3 loginPage-col-md-2"></div>
                        <div className="loginPage-col-lg-6 loginPage-col-md-8 loginPage-login-box">
                            <div className="loginPage-col-lg-12 loginPage-login-key">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </div>
                            <div className="loginPage-col-lg-12 loginPage-login-title">
                                ADMIN PANEL
                            </div>
                            <div className="loginPage-col-lg-12 loginPage-login-form">
                                <form onSubmit={login}>
                                    <div className="loginPage-form-group">
                                        <label className="loginPage-form-control-label">USERNAME</label>
                                        <input 
                                            type="text" 
                                            className="loginPage-form-control" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPage-form-group">
                                        <label className="loginPage-form-control-label">PASSWORD</label>
                                        <input 
                                            type="password" 
                                            className="loginPage-form-control" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPage-col-lg-12 loginPage-loginbttm">
                                        <div className="loginPage-col-lg-6 loginPage-login-btm loginPage-login-text">
                                            {error && <div className="loginPage-error-message">{error}</div>}
                                        </div>
                                        <div className="loginPage-col-lg-6 loginPage-login-btm loginPage-login-button">
                                            <button type="submit" className="loginPage-btn loginPage-btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    <div className="loginPage-col-lg-3 loginPage-col-md-2"></div>
                </div>
            </div>
        </div>
        
    );
};
export default LoginPage;