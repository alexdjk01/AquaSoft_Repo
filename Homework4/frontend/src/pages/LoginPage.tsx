import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiTransferData/apiClient';
import UserLogin from '../interfaces/UserLogin';
import {jwtDecode} from 'jwt-decode';
import '../css/Login.css';


export default function LoginPage() {
    const navigate = useNavigate();

    const [userLoginData, setUserLoginData] = useState<UserLogin>({
        Email: '',
        Password: '',
    });

    const [resultMessage, setResultMessage] = useState<string | null>(null); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserLoginData({
            ...userLoginData,
            [name]: value, 
        });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        try {
            console.log(userLoginData);
            const response = await apiClient.post('/users/login', userLoginData); 
            if (response.status === 201) {
                const access_token  = response.data.access_token;
                console.log(access_token);
                if (access_token) {
                    const decodedToken = jwtDecode(access_token); 
                    console.log('Decoded Token:', decodedToken); 

                    localStorage.setItem('token', access_token);

                    localStorage.setItem('userInfo', JSON.stringify(decodedToken));
                    setResultMessage('Login successful!');
                    navigate('/dashboard'); 
                }
            }
        } catch (err: any) {
            if (err.response) {
                setResultMessage(`Login failed: ${err.response.data.message}`);
            } else {
                setResultMessage('An error occurred during login.');
            }
            alert(resultMessage); 
        }
    };

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">Login</h2>
          <label className="login-label">Email</label>
          <input
            type="email"
            name="Email"
            value={userLoginData.Email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <label className="login-label">Password</label>
          <input
            type="password"
            name="Password"
            value={userLoginData.Password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    );
}
