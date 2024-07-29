import React, { useState } from 'react';
import api from '../axios/api';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', {
                username,
                password,
            });
            alert(response.data.msg);
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"/>
            <button type="submit" className="btn">Register</button>
        </form>
    );
}

export default Register;
