import React, { useState } from 'react';
import api from '../axios/api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        try {
            const response = await api.post('http://localhost:5000/user/login', {
                username,
                password,
            });
            alert(response.data.msg);
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </form>
    );
}

export default Login;
