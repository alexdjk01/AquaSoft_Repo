import React, { useEffect, useState } from 'react';
import apiClient from '../apiTransferData/apiClient';
import UserDashboard from '../interfaces/UserDashboard';
import { jwtDecode } from 'jwt-decode';
import Permission from '../interfaces/Permission';
import '../css/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import '../css/ManageHotelManagers.css';

export default function ManageHotelManagers() {

    const [loggedUser, setLoggedUser] = useState<UserDashboard | null>(null);
    const [hotelManagers, setHotelManagers] = useState<UserDashboard[]>([]);
    const [showManagers, setShowManagers] = useState<boolean>(false);
    const [linkURL, setLinkURL] = useState<string>('');
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [permission, setPermission] = useState<Permission | null>(null);
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

    //Check permission
    useEffect(() => {
        const roleID: number | undefined = loggedUser?.RoleID;
        const fetchPermission = async () => {
            try {
                const response = await apiClient.get(`/users/getPermissionByRoleId/${roleID}`);
                setPermission(response.data);

                // Check authorization
                const isManager: boolean = roleID === 2 || roleID === 1; //Group manager  |  Hotel Manager
                const hasReadPermission = response.data?.ReadPermission;

                if (isManager && hasReadPermission) {
                    setIsAuthorized(true); // Allow access
                } else {
                    setIsAuthorized(false); // Deny access
                }

            } catch (error) {
                console.error('Error fetching logged-in user:', error);
            }
        };
        fetchPermission();
    }, [loggedUser?.RoleID])



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

    const handleSendLink = async (managerId: number) => {
        try {
            console.log(linkURL, managerId);
            // Send the link to the backend to save it in the database
            await apiClient.post('/users/createLinkByUserId', {
                UserID: managerId,
                LinkURL: linkURL,

            });
            alert(`Link sent to manager ${managerId}: ${linkURL}`);
            console.log(`Link sent to manager ${managerId}: ${linkURL}`);
        } catch (error) {
            console.error('Error sending link to manager:', error);
        }
    };

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLinkURL(event.target.value);
    };

    const toggleManagers = () => {
        setShowManagers((prev) => !prev);
    };

    const handleGoToHotelPageLink = (linkStringURL: string) => {
        if (linkStringURL.startsWith('http')) {
            window.location.href = linkStringURL; // absolute URLs
          } else {
            navigate(linkStringURL); // relative URLs
          }
    };


    if (!isAuthorized) {
        return (
            <div className="unauthorized-container">
                <h1>You are not allowed to visit this page.</h1>
                <button onClick={() => navigate('/dashboard')} className="go-back-button">
                    Turn Back
                </button>
            </div>
        );
    }



    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Hotel Group Manager Panel</h1>

            {/* get infos about the current logged user */}
            {loggedUser && (
                <div className="logged-user-info" style={{ marginTop: '20px' }}>
                    <h3>Hello back, {loggedUser.Name} </h3>
                    <p><strong>Email:</strong> {loggedUser.Email}</p>
                    <p><strong>HotelGroupID:</strong> {loggedUser.HotelGroupID}</p>
                </div>
            )}

            {/* Add input for link */}
            <div className="input-container" style={{ marginBottom: '20px' }}>
                <label htmlFor="link-input" style={{ marginRight: '10px' }}>Enter Link:</label>
                <input
                    id="link-input"
                    type="text"
                    value={linkURL}
                    onChange={handleLinkChange}  // Handle changes to the link input
                    placeholder="Enter a link"
                    style={{ padding: '10px', width: '300px', marginRight:'20px' }}
                />
                <button
                    className="btn btn-info"
                    onClick={() => handleGoToHotelPageLink(linkURL)} // Use an arrow function to call the handler
                >
                    Go to
                </button>
            </div>


            {/* button for displaying/hide hotel managers with same group */}
            <button onClick={toggleManagers} className="btn btn-info" style={{ marginTop: '20px' }}>
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
                                <th>Action</th> {/* Button to send link */}
                            </tr>
                        </thead>
                        <tbody>
                            {hotelManagers.map((manager) => (
                                <tr key={manager.UserID}>
                                    <td>{manager.UserID}</td>
                                    <td>{manager.UserName}</td>
                                    <td>{manager.Name}</td>
                                    <td>{manager.Email}</td>
                                    <td>
                                        <button
                                            onClick={() => handleSendLink(manager.UserID)}
                                            className="send-link-button"
                                            style={{ padding: '5px 10px' }}
                                        >Send Link</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
