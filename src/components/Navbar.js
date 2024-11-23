import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Soo Cheek</h1>
        <ul className="navbar-links">
          {/* Replace <a> tags with <Link> for navigation */}
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/artist">Artist</Link></li>
          <li><Link to="/order">Order</Link></li>
          <li><Link to="/login">login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
