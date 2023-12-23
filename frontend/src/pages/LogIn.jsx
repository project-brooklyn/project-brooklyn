import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // help fix this please
        const baseUrl = 'http://localhost:8000';

        try {
            const res = await axios.post(baseUrl + '/api/login/', formData);
            const user = res.data.user;
            // handle user in session

            navigate('/')
        } catch (err) {
            console.error(err);
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
        </form>
    );
};

export default LogIn;