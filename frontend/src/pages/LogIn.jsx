import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../utils/api_utils';

const LogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();
    useEffect(logout, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;
        if (!email) {
            setError('Email is required');
            return;
        } else if (!password) {
            setError('Password is required');
            return;
        }

        try {
            const { success, error } = await login(formData);
            if (success) {
                navigate('/');
            } else {
                setError(error);
            }
        } catch (err) {
            console.error(err);
            setError('An unknown error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default LogIn;
