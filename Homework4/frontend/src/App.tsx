import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboradPage';
import Navbar from './components/Navbar';
import ManageHotelManagers from './pages/ManageHotelManagers';
import HotelPage from './pages/HotelPage';
import AdministrationPage from './pages/AdministrationPage';

function App() {
  return (
    <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/manageHotelManagers" element={<ManageHotelManagers />} />
                    <Route path="/hotelpage" element={<HotelPage />} />
                    <Route path="/administrationPage" element={<AdministrationPage />} />
                </Routes>
            </div>
        </Router>
  );
}

export default App;
