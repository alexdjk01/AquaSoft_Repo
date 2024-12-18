import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiTransferData/apiClient';
import UserLogin from '../interfaces/UserLogin';
import {jwtDecode} from 'jwt-decode';

export default function LoginPage() {
    const navigate = useNavigate();

    const [userLoginData, setUserLoginData] = useState<UserLogin>({
        Email: '',
        Password: '',
    });

    const [resultMessage, setResultMessage] = useState<string | null>(null); // Response message or null by default

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserLoginData({
            ...userLoginData,
            [name]: value, // Dynamically update the email or password field
        });
    };

    // Handle form submission
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page refresh
        try {
            console.log(userLoginData);
            const response = await apiClient.post('/users/login', userLoginData); 
            if (response.status === 201) {
                const access_token  = response.data.access_token;
                console.log(access_token);
                if (access_token) {
                    const decodedToken = jwtDecode(access_token); // Decode the token
                    console.log('Decoded Token:', decodedToken); // Debugging purposes

                    // Store token in localStorage
                    localStorage.setItem('token', access_token);

                    // Optionally store decoded user info
                    localStorage.setItem('userInfo', JSON.stringify(decodedToken));

                    setResultMessage('Login successful!');
                    alert(resultMessage); // Show success message
                    navigate('/dashboard'); // Redirect to dashboard
                }
            }
        } catch (err: any) {
            if (err.response) {
                setResultMessage(`Login failed: ${err.response.data.message}`);
            } else {
                setResultMessage('An error occurred during login.');
            }
            alert(resultMessage); // Show error message
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="Email"
                        value={userLoginData.Email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="Password"
                        value={userLoginData.Password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
