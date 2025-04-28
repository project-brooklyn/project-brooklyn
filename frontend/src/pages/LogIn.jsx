import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LogIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => { if (user) logout() }, [user, logout]);

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
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.response.data.error);
        }
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
