import React,{ useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import UserRegistration from '../interfaces/UserRegistration';
import apiClient from '../apiTransferData/apiClient';
import '../css/Register.css';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [userRegisterData, setUserRegisterData] = useState<UserRegistration>({    //defaul state is empty
        UserName: '',
        Name:'',
        Email: '',
        Password: '',
    });

    const [resultMessage, setResultMessage] = useState<string | null>(null); //the response is a string or a default null

    //Typescript way to handle changes (( old JS: onInputChange()))
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserRegisterData({
            ...userRegisterData,
            [name]: value,      //updates just the field that changes : name , email or password
        });
    };

    //Typescript way to handle submit 
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault(); //prevents the window to refresh
        try{
            const response = await apiClient.post('/users/register', userRegisterData); 
            if(response.status === 201)
            {
                setResultMessage('User has been registered successfully into the database!'); //In order to display an alert message message after
                alert(resultMessage);
                navigate('/login');
            }
        }
        catch(err:any)
        {
            if(err.response){
                setResultMessage(`Some error occured: ${err.response.data.message}`);
            }
            else{
                setResultMessage('Error occured during registration!');
            }
            alert(resultMessage);
        }
    };

    return(
        <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Register</h2>
        <label className="register-label">UserName</label>
        <input
          type="text"
          name="UserName"
          value={userRegisterData.UserName}
          onChange={handleChange}
          required
          className="register-input"
        />
        <label className="register-label">Name</label>
        <input
          type="text"
          name="Name"
          value={userRegisterData.Name}
          onChange={handleChange}
          required
          className="register-input"
        />
        <label className="register-label">Email</label>
        <input
          type="email"
          name="Email"
          value={userRegisterData.Email}
          onChange={handleChange}
          required
          className="register-input"
        />
        <label className="register-label">Password</label>
        <input
          type="password"
          name="Password"
          value={userRegisterData.Password}
          onChange={handleChange}
          required
          className="register-input"
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
    );
}
