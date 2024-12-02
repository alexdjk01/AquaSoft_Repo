import React from 'react';
import { useState, useRef } from 'react';
import './App.css';

function App() {

    const [email, setEmail] = useState<string>(""); // ssave and set the email. default state is "";
    const [password, setPassword] = useState<string>("");

    const email2 = React.useRef<HTMLInputElement>(null);;
    const password2 = React.useRef<HTMLInputElement>(null);;


    const submitAction = (event: React.FormEvent) => {
      event.preventDefault();   //prevents the windoew from refreshing
      console.log(`${email} - ${password}`);
    }

    const submitActionRef = (event: React.FormEvent) => {
      event.preventDefault();
      console.log(`${email2.current?.value} - ${password2.current?.value}`);    //to access the value, we need to use .current.value
    }

  

  return (
    <div className='background'>
        <h1 className='centerText'>Test React Hooks!</h1>
        <form className='centerText'>
          <div>
            <label>Email address:</label>
            <input type='email' value={email} onChange={(e) =>{setEmail(e.target.value); console.log('Render email');}}></input> 
          </div>
          <div>
            <label>Password:</label>
            <input type='password' value={password} onChange={(e) =>{setPassword(e.target.value); console.log('Render password')}}></input> 
          </div>
          <button type="submit" onClick={submitAction}>Sumbit credentials</button>
          <p>{email}</p>
        </form>
        <h1 className='centerText'>-------------------------------------</h1>
        <form className='centerText'>
          <div>
            <label>Email address:</label>
            <input type='email'  ref={email2}></input> 
          </div>
          <div>
            <label>Password:</label>
            <input type='password'  ref={password2}></input> 
          </div>
          <button type="submit" onClick={submitActionRef}>Sumbit credentials</button>
          <p>{email2.current?.value}</p>
        </form>

        <p className='expo'> useState is more usefull when we deal with dynamic pages and need to refresh the elements on spot</p>
        <p className='expo'> useRef works better in the background, keeping track of the variables and thier values without re-rendering.</p>
    </div>
     

     

  );
}

export default App;
