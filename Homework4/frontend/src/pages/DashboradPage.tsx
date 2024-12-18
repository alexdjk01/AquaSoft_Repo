import React, { useEffect, useState } from 'react';
import apiClient from '../apiTransferData/apiClient';
import UserDashboard from '../interfaces/UserDashboard';
import { jwtDecode } from 'jwt-decode';
import '../css/Dashboard.css'; 
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
    const [users, setUsers] = useState<UserDashboard[]>([]);
    const [loggedUser, setLoggedUser] = useState<UserDashboard | null>(null);
    const [hotelManagers, setHotelManagers] = useState<UserDashboard[]>([]);
    const [showTable, setShowTable] = useState<boolean>(false);
    const [showManagers, setShowManagers] = useState<boolean>(false);
    const navigate = useNavigate();

    // decode the token and get the current userId
    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decodedToken: any = jwtDecode(jwtToken);
            const userId = decodedToken?.userId;
            console.log(userId);

            const fetchLoggedUser = async () => {
                try {
                    const response = await apiClient.get(`/users/findById/${userId}`);
                    console.log(response);
                    setLoggedUser(response.data);
                } catch (error) {
                    console.error('Error fetching logged-in user:', error);
                }
            };

            fetchLoggedUser();
        }
    }, []);

  


    return (

        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Dashboard</h1>

             {/* get infos about the current logged user */}
             {loggedUser && (
                <div className="logged-user-info" style={{ marginTop: '20px' }}>
                    <h3>Logged-in User Information:</h3>
                    <p><strong>Name:</strong> {loggedUser.Name}</p>
                    <p><strong>Email:</strong> {loggedUser.Email}</p>
                    <p><strong>HotelGroupID:</strong> {loggedUser.HotelGroupID}</p>
                </div>
            )}
        </div>
    );
}
