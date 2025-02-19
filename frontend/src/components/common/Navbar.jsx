import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">AI Platform</span>
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
              <Link to="/models" className="text-gray-700 hover:text-indigo-600">Models</Link>
              <Link to="/training" className="text-gray-700 hover:text-indigo-600">Training</Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-indigo-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">© 2025 AI Platform. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="/terms" className="text-gray-600 hover:text-indigo-600">Terms</a>
            <a href="/privacy" className="text-gray-600 hover:text-indigo-600">Privacy</a>
            <a href="/contact" className="text-gray-600 hover:text-indigo-600">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// src/components/common/Loading.jsx
import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
