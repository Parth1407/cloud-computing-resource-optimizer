import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Login from './components/Login';
import CloudSetup from './components/CloudSetup';
import LlmSetup from './components/LlmSetup';
import Dashboard from './components/Dashboard';
import Security from './components/Security';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import './App.css';

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/';

  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cloud-setup" element={<CloudSetup />} />
        <Route path="/llm-setup" element={<LlmSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/security" element={<Security />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;