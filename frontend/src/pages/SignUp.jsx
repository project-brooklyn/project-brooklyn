import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(logout);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // this will be changed to use .env
        const baseUrl = 'http://localhost:8000';

        try {
            const res1 = await axios.post(baseUrl + '/api/signup/', formData);
            if (res1.status===201) {
                const res2 = await axios.post(baseUrl + '/api/login/', formData);
                const user = res2.data.user;

                login(user);
                navigate('/');
            }
        } catch (err) {
            setUsernameError(err.response.data.username);
            setPasswordError(err.response.data.password);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <br />
            <label>
                Username: 
                <input
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {usernameError || ''}
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
                {passwordError || ''}
            </label>
            <br />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignUp;
