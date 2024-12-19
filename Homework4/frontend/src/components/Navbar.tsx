import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const jwtToken = localStorage.getItem('token');
  let userRole: number | null = null;

  if (jwtToken) {
    try {
      const decodedToken: any = jwtDecode(jwtToken);
      userRole = decodedToken?.role; // Assuming 'role' is stored in the token payload
      console.log('User Role:', userRole); // Check if role is correctly extracted
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const handlerLoginClick = () => {
    navigate('/login');
  };

  const handlerRegisterClick = () => {
    navigate('/register');
  };


  const handlerLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/');
  };



  const handlerManageClick = () => {
    navigate('/manageHotelManagers'); // Navigate to the manage page
  };

  const handlerAdminClick = () => {
    navigate('/administrationPage'); // Navigate to the admin page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a
        className="navbar-brand"
        href="/"
        style={{ fontSize: '20px', fontWeight: 'bold' }}
      >
        Hotel Management
      </a>
      <div className="d-flex ms-auto">
        {/* Conditional display based on current page status */}
        {['/', '/login', '/register'].includes(location.pathname) ? (
          <>
            <button
              className="btn btn-outline-primary me-2"
              onClick={handlerLoginClick}
            >
              Login
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handlerRegisterClick}
            >
              Register
            </button>
          </>
        ) : location.pathname === '/dashboard' ? (
          <>
            {userRole === 2 && ( // Only for Hotel Group Managers
              <button
                className="btn btn-outline-warning me-2"
                onClick={handlerManageClick}
              >
                Manage
              </button>
            )}
            {userRole === 4 && ( // Only for Hotel admin
              <button
                className="btn btn-outline-warning me-2"
                onClick={handlerAdminClick}
              >
                Admin
              </button>
            )}
            <button
              className="btn btn-outline-danger"
              onClick={handlerLogoutClick}
            >
              Logout
            </button>
          </>
        ) : location.pathname === '/manageHotelManagers' ? (
          <>   
             <button
              className="btn btn-outline-danger"
              onClick={handlerLogoutClick}
            >
              Logout
            </button>
          </>
        ):location.pathname === '/administratorPage' ? (
          <>   
             <button
              className="btn btn-outline-danger"
              onClick={handlerLogoutClick}
            >
              Logout
            </button>
          </>):null}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
