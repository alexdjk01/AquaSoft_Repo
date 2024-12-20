import React, { useEffect, useState } from 'react';
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
  const [permission, setPermission] = useState<Permission | null>(null);
  const [newUser, setNewUser] = useState<UserDashboard | null>(null); // State for adding new users
  const [editedUsers, setEditedUsers] = useState<UserDashboard[]>([]); // State for edited users
  const navigate = useNavigate();

  // Decode the token and get the current userId
  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);
      const userId = decodedToken?.userId;

      const fetchLoggedUser = async () => {
        try {
          const response = await apiClient.get(`/users/findById/${userId}`);
          setLoggedUser(response.data);
        } catch (error) {
          console.error('Error fetching logged-in user:', error);
        }
      };

      fetchLoggedUser();
    }
  }, []);

  // Check permissions
  useEffect(() => {
    const roleID: number | undefined = loggedUser?.RoleID;
    const fetchPermission = async () => {
      try {
        const response = await apiClient.get(`/users/getPermissionByRoleId/${roleID}`);
        setPermission(response.data);

        // Check authorization
        const isAdministrator: boolean = roleID === 4; // Only administrators
        const hasReadPermission = response.data?.ReadPermission;
        const hasWritePermission = response.data?.WritePermission;

        if (isAdministrator && hasReadPermission && hasWritePermission) {
          setIsAuthorized(true); // Allow access
        } else {
          setIsAuthorized(false); // Deny access
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermission();
  }, [loggedUser?.RoleID]);

  // Get all users
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

  // Toggle the table
  const toggleTable = () => {
    setShowTable((prev) => !prev);
  };

  // Handle input change for editing users
  const handleInputChange = (id: number, field: string, value: string) => {
    const sanitizedValue = value.trim() === '' ? null : value; // Convert blank values to null
    const updatedUsers = users.map((user) =>
      user.UserID === id ? { ...user, [field]: sanitizedValue } : user
    );
    setUsers(updatedUsers);
  
    const updatedEditedUsers = [...editedUsers];
    const existingIndex = updatedEditedUsers.findIndex((user) => user.UserID === id);
  
    if (existingIndex > -1) {
      updatedEditedUsers[existingIndex] = {
        ...updatedEditedUsers[existingIndex],
        [field]: sanitizedValue,
      };
    } else {
      const updatedUser = updatedUsers.find((user) => user.UserID === id);
      if (updatedUser) updatedEditedUsers.push(updatedUser);
    }
  
    setEditedUsers(updatedEditedUsers);
  };

  // Save changes for edited users
  const handleSaveChanges = async () => {
    try {
      await Promise.all(
        editedUsers.map((user) =>
          apiClient.put(`/users/${user.UserID}`, user)
        )
      );
      alert('Changes saved successfully!');
      setEditedUsers([]); // Clear the edited users list
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes.');
    }
  };

  // Handle deletion of a user
  const handleDelete = async (id: number) => {
    console.log('Used ID to delete: ',id);
    try {
      await apiClient.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.UserID !== id));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  // Render if authorization fails
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

      {/* Logged-in user information */}
      {loggedUser && (
        <div className="logged-user-info" style={{ marginTop: '20px' }}>
          <h3>Logged-in User Information:</h3>
          <p><strong>Name:</strong> {loggedUser.Name}</p>
          <p><strong>Email:</strong> {loggedUser.Email}</p>
        </div>
      )}

     
      {/* Toggle user table */}
      <button onClick={toggleTable} className="save-button">
        {showTable ? 'Hide User Table' : 'Show User Table'}
      </button>

      {/* Editable user table */}
      {showTable && (
        <div className="table-container">
          <h4>Edit or Delete Users</h4>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.UserID}>
                  <td>{user.UserID}</td>
                  <td>
                    <input
                      type="text"
                      value={user.UserName}
                      onChange={(e) =>
                        handleInputChange(user.UserID, 'UserName', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={user.Name}
                      onChange={(e) =>
                        handleInputChange(user.UserID, 'Name', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={user.Email}
                      onChange={(e) =>
                        handleInputChange(user.UserID, 'Email', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={user.RoleID}
                      onChange={(e) =>
                        handleInputChange(user.UserID, 'RoleID', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={user.HotelID || ''}
                      onChange={(e) =>
                        handleInputChange(user.UserID, 'HotelID', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={user.HotelGroupID || ''}
                      onChange={(e) =>
                        handleInputChange(user.UserID, 'HotelGroupID', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.UserID)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={handleSaveChanges} className="save-button">
        Save Changes
      </button>
    </div>
  );
}
