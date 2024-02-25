import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LogIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(logout,[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // this will be changed to use .env
        const baseUrl = 'http://localhost:8000';

        try {
            const res = await axios.post(baseUrl + '/api/login/', formData);
            const user = res.data.user;
            // handle user in session

            login(user);
            navigate('/');
        } catch (err) {
            setError(err.response.data.error);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <br />
            <label>
                Username: 
                <input
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Password: 
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Login</button>
            {error || ''}
        </form>
    );
};

export default LogIn;
