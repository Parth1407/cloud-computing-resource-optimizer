import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Cloud, Infinity, LayoutDashboard, Puzzle, Shield, Settings, LogOut, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Highlight active links
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/login');
  };

  return (
    <nav className={`global-navbar ${theme}`}>
      <div className="navbar-container">
        
        {/* Left: Brand */}
        <div className="navbar-brand">
          <div className="minimal-logo-nav">
            <Cloud className="cloud-layer" size={18} />
            <Infinity className="infinity-layer" size={11} />
          </div>
          <span className="brand-name">Cloud Resource Optimizer</span>
          <span className="pro-badge-nav">PRO</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="navbar-links">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link to="/cloud-setup" className={`nav-link ${(isActive('/cloud-setup') || isActive('/llm-setup')) ? 'active' : ''}`}>
            <Puzzle size={16} /> Integrations
          </Link>
          <Link to="/security" className={`nav-link ${isActive('/security') ? 'active' : ''}`}>
            <Shield size={16} /> Security
          </Link>
          <Link to="/settings" className={`nav-link ${isActive('/settings') ? 'active' : ''}`}>
            <Settings size={16} /> Settings
          </Link>
        </div>

        {/* Right: User Profile & Actions */}
        <div className="navbar-actions">
          <button className="nav-theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="divider"></div>
          <div className="user-profile">
            <div className="avatar">
              <User size={14} />
            </div>
            <div className="user-info">
              <span className="user-name">Architect Lead</span>
              <span className="user-role">admin@enterprise.com</span>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <button className="logout-btn" onClick={handleLogout} title="Sign Out">
            <LogOut size={16} />
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
