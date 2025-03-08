import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './css/Navbar.css';
import { useAuth } from '../AuthContext'; // Assuming you have the AuthContext

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Soo Cheek</h1>
        <ul className="navbar-links">
          {/* Regular Links */}
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/artist">Artist</Link></li>
          <li><Link to="/order">Order</Link></li>

          {/* Conditional Logout Link */}
          {isAuthenticated && (
            <li className="logout-link" onClick={logout}>
              Logout
            </li>
          )}

          {/* Login Link (only shown when not authenticated) */}
          {!isAuthenticated && (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
