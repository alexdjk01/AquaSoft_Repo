import React, { useEffect, useState }  from 'react';
import apiClient from '../apiTransferData/apiClient';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

  
    const navigate = useNavigate();

    const handeSubmitClick = () =>{
        navigate('/register')
    }

    const handeLoginClick = () =>{
      navigate('/login')
  }
  

      return (
        <div>

          <div className='header'>
              <h1 className='title'>Welcome to Hotel Scanner</h1>
              <h3 className='second-title'>Where to next?</h3>

             <div className='header-continue'>
                <p className='small-text'>New to Hotel Scanner? Please Register!</p>
                <button 
                  onClick={() => handeSubmitClick()}
                      className="button" 
                      style={{ padding: '5px 10px' }}
                    >Register
                </button>
              </div>
              <div className='header-continue'>
                <p className='small-text'>Already have an account? Login!</p>
                <button 
                  onClick={() => handeLoginClick()}
                      className="button" 
                      style={{ padding: '5px 10px' }}
                    >Login
                </button>
             </div>
          </div>

          

          <div className='footer'>
            <h1 className='sub-title'>Explore the World!</h1>
           
            <p className='locations-title'> Discover new locations</p>
            <p className='locations1'> Tokyo</p>
            <p className='locations2'> Los Angeles</p>
            <p className='locations3'> Bucuresti</p>
            <p className='locations4'> New York</p>
            
           
          </div>

        </div>
         
      );
};
