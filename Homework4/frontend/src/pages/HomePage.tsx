import React, { useEffect, useState } from 'react';
import apiClient from '../apiTransferData/apiClient';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import homepagePhoto1 from '../img/homepagePhoto1.avif';
import homepagePhoto2 from '../img/homepagePhoto2.avif';
import homepagePhoto3 from '../img/homepagePhoto3.avif';
import homepagePhoto4 from '../img/homepagePhoto4.avif';
import homepagePhoto5 from '../img/homepagePhoto5.avif';
import homepagePhoto6 from '../img/homepagePhoto6.avif';
import homepagePhoto7 from '../img/homepagePhoto7.avif';
import homepagePhoto8 from '../img/homepagePhoto8.avif';
import homepagePhoto9 from '../img/homepagePhoto9.avif';
import homepagePhoto10 from '../img/homepagePhoto10.avif';

export default function HomePage() {


  const navigate = useNavigate();

  const handeSubmitClick = () => {
    navigate('/register')
  }

  const handeLoginClick = () => {
    navigate('/login')
  }


  return (
    <div>

      <div className='header'>
        <h1 className='title'>Welcome to Hotel Scanner</h1>
        <h3 className='second-title'>Where to next?</h3>

        <div className='header-continue'>
          <p>
            New to Hotel Scanner?{' '}
            <span
              className="clickable-link"
              onClick={handeSubmitClick}
            >
              Register
            </span>
          </p>
        </div>
        <div className='header-continue'>
          <p>
            Already have an account?{' '}
            <span
              className="clickable-link"
              onClick={handeLoginClick}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <div className="card-container">
        <div className="card">
          <img src={homepagePhoto1} alt="Kovilj, Serbia" />
          <div className="info">
            <p>499 RON / night</p>
            <h3>Kovilj, Serbia</h3>
            <div className="rating">
              <span>⭐</span>
              <span>5.0</span>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={homepagePhoto2} alt="Râșnov, Romania" />
          <div className="info">
            <p>270 RON / night</p>
            <h3>Râșnov, Romania</h3>
            <div className="rating">
              <span>⭐</span>
              <span>4.9</span>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={homepagePhoto3} alt="Burns Lake, Canada" />
          <div className="info">
            <p>598 RON / night</p>
            <h3>Burns Lake, Canada</h3>
            <div className="rating">
              <span>⭐</span>
              <span>4.8</span>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={homepagePhoto4} alt="Sinaia, Romania" />
          <div className="info">
            <p>352 RON / night</p>
            <h3>Sinaia, Romania</h3>
            <div className="rating">
              <span>⭐</span>
              <span>4.7</span>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={homepagePhoto5} alt="Zakaopane, Poland" />
          <div className="info">
            <p>429 RON / night</p>
            <h3>Zakaopane, Poland</h3>
            <div className="rating">
              <span>⭐</span>
              <span>5.0</span>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={homepagePhoto6} alt="Baric, Serbia" />
          <div className="info">
            <p>320 RON / night</p>
            <h3>Baric, Serbia</h3>
            <div className="rating">
              <span>⭐</span>
              <span>3.9</span>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={homepagePhoto7} alt="Borsa, Romania" />
          <div className="info">
            <p>900 RON / night</p>
            <h3>Borsa, Romania</h3>
            <div className="rating">
              <span>⭐</span>
              <span>4.7</span>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={homepagePhoto8} alt="Kraishte, Bularia" />
          <div className="info">
            <p>620 RON / night</p>
            <h3>Kraishte, Bularia</h3>
            <div className="rating">
              <span>⭐</span>
              <span>4.5</span>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={homepagePhoto9} alt="Sekulici, Serbia" />
          <div className="info">
            <p>550 RON / night</p>
            <h3>Sekulici, Serbia</h3>
            <div className="rating">
              <span>⭐</span>
              <span>4.5</span>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={homepagePhoto10} alt="Sadu, Romania" />
          <div className="info">
            <p>899 RON / night</p>
            <h3>Sadu, Romania</h3>
            <div className="rating">
              <span>⭐</span>
              <span>4.5</span>
            </div>
          </div>
        </div>
      </div>




    </div>

  );
};
