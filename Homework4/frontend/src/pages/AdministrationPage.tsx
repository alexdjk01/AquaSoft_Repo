import React, { useEffect, useState }  from 'react';
import apiClient from '../apiTransferData/apiClient';
import UserDashboard from '../interfaces/UserDashboard';
import { jwtDecode } from 'jwt-decode';
import Permission from '../interfaces/Permission';
import '../css/Dashboard.css'; 
import { useNavigate } from 'react-router-dom';


export default function AdministrationPage() {

    const [users, setUsers] = useState<UserDashboard[]>([]);
    const [loggedUser, setLoggedUser] = useState<UserDashboard | null>(null);
    const [showTable, setShowTable] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [permission,setPermission] = useState<Permission | null>(null);
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
    useEffect( () => {
        const roleID:number|undefined = loggedUser?.RoleID;
        const fetchPermission = async () => {
          try {
            const response = await apiClient.get(`/users/getPermissionByRoleId/${roleID}`);
            setPermission(response.data) ;
    
            // Check authorization
            const isAdministrator:boolean = roleID === 4; 
            const hasReadPermission = response.data?.ReadPermission;
            const hasWritePermission = response.data?.WritePermission;
    
            if (isAdministrator && hasReadPermission && hasWritePermission) {
              setIsAuthorized(true); // Allow access
            } else {
              setIsAuthorized(false); // Deny access
            }
    
          } catch (error) {
            console.error('Error fetching logged-in user:', error);
          }
        };
        fetchPermission();
      },[loggedUser?.RoleID])

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

    
    const toggleTable = () => {
        setShowTable((prev) => !prev);
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
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Administration</h1>

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
    </div>
      );
};
