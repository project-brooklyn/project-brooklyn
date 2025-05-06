import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('project-bk-token');
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // this will be changed to use .env
        const baseUrl = 'http://localhost:5000';

        try {
            const res1 = await axios.post(baseUrl + '/api/register/', formData);
            if (res1.status === 201) {
                const res2 = await axios.post(baseUrl + '/api/login/', formData);
                const { token } = res2.data;

                localStorage.setItem('project-bk-token', token);
                navigate('/');
            }
        } catch (err) {
            console.error(err);
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
        </form>
    )
}

export default SignUp;
