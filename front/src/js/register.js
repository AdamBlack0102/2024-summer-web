import api from '../axios/api';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {

    const handleRegister = async (e) => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const history = useHistory();

        e.preventDefault();
        try {
            const response = await api.post('http://localhost:4000/user/register', {
                username,
                password,
            });
            alert(response.data.msg);
            if(response.data.success) {

            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
