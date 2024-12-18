import React, { useEffect, useState }  from 'react';
import apiClient from '../apiTransferData/apiClient';
import UserDashboard from '../interfaces/UserDashboard';
import { jwtDecode } from 'jwt-decode';
import '../css/Dashboard.css'; 
import { useNavigate } from 'react-router-dom';

export default function ManageHotelManagers() {

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

    // get all the users of the platform
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiClient.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching all users:', error);
            }
        };

        fetchUsers();
    }, []);

    // get all the hotel managers with the same if as the hotel group manager
    useEffect(() => {
        if (loggedUser?.HotelGroupID) {
            const fetchHotelManagers = async () => {
                try {
                    const response = await apiClient.get(
                        `/users/retrieveManagers/${loggedUser.HotelGroupID}`
                    );
                    setHotelManagers(response.data);
                } catch (error) {
                    console.error('Error fetching hotel managers:', error);
                }
            };

            fetchHotelManagers();
        }
    }, [loggedUser]);

    const toggleTable = () => {
        setShowTable((prev) => !prev);
    };

    const toggleManagers = () => {
        setShowManagers((prev) => !prev);
    };


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

            {/* button for displaying/hide user table */}
            <button onClick={toggleTable} className="dashboard-button">
                {showTable ? 'Hide User Table' : 'Show User Table'}
            </button>

            {/* the user table */}
            {showTable && (
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>UserID</th>
                                <th>UserName</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>RoleID</th>
                                <th>HotelID</th>
                                <th>HotelGroupID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.UserID}>
                                    <td>{user.UserID}</td>
                                    <td>{user.UserName}</td>
                                    <td>{user.Name}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.RoleID}</td>
                                    <td>{user.HotelID || 'N/A'}</td>
                                    <td>{user.HotelGroupID || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

           

            {/* button for displaying/hide hotel managers with same group */}
            <button onClick={toggleManagers} className="dashboard-button" style={{ marginTop: '20px' }}>
                {showManagers ? 'Hide Hotel Managers' : 'Show Hotel Managers'}
            </button>

            {/* hotel manager entities table */}
            {showManagers && (
                <div className="table-container" style={{ marginTop: '20px' }}>
                    <h3>Hotel Managers in Your Group:</h3>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>UserID</th>
                                <th>UserName</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelManagers.map((manager) => (
                                <tr key={manager.UserID}>
                                    <td>{manager.UserID}</td>
                                    <td>{manager.UserName}</td>
                                    <td>{manager.Name}</td>
                                    <td>{manager.Email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      );
};
