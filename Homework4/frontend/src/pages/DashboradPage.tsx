import React, { useEffect, useState } from 'react';
import apiClient from '../apiTransferData/apiClient';
import UserDashboard from '../interfaces/UserDashboard';
import { jwtDecode } from 'jwt-decode';
import '../css/Dashboard.css'; 
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
    const [loggedUser, setLoggedUser] = useState<UserDashboard | null>(null);
    const [availableLinks, setAvailableLinks] = useState<string[]>([]); 

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
                    if (response.data.RoleID === 1) {
                        const linksResponse = await apiClient.get(`/users/getLink/${userId}`);
                        console.log(linksResponse);
                        setAvailableLinks(linksResponse.data.map((link: { LinkURL: string }) => link.LinkURL));
                    }
                } catch (error) {
                    console.error('Error fetching logged-in user:', error);
                }
            };

            fetchLoggedUser();
        }
    }, []);

  


    return (

        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>

            {loggedUser && loggedUser.RoleID === 1 && (
                <div className="available-links">
                    <p>Available Links for Hotel Manager:</p>
                    <ul>
                        {availableLinks.length > 0 ? (
                            availableLinks.map((link, index) => (
                                <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                            ))
                        ) : (
                            <p>No links available at the moment.</p>
                        )}
                    </ul>
                </div>
            )}

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
