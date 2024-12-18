import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlerLoginClick = () => {
    navigate('/login');
  };

  const handlerRegisterClick = () => {
    navigate('/register');
  };

  const handlerProfileClick = () => {
    navigate('/profile');
  };

  const handlerLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const handlerBackClick = () => {
    navigate('/dashboard');
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
          {/* conditinal display based on current page status */}
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
              <button
                className="btn btn-outline-primary me-2"
                onClick={handlerProfileClick}
              >
                Profile
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handlerLogoutClick}
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
