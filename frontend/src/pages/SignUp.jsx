import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, register } from '../utils/api_utils';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password } = formData;
        if (!username) {
            setError('Username is required');
            return;
        } else if (!email) {
            setError('Email is required');
            return;
        } else if (!password) {
            setError('Password is required');
            return;
        } else if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            const { success, error } = await register(formData);
            if (success) {
                await login(formData);
                navigate('/');
            } else {
                setError(error);
            }
        } catch (err) {
            console.error(err);
            setError('An unknown error occurred. Please try again later.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <br />
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </label>
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
            <button type="submit">Sign Up</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default SignUp;
