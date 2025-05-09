import React from 'react';
import { Bell } from 'react-bootstrap-icons';
import './Topbar.css';

const Topbar = ({ darkMode, setDarkMode }) => (
  <div className="topbar d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom">
    <div className="topbar-title">
      <h4 className="mb-0 fw-bold">Dashboard</h4>
    </div>
    <div className="d-flex align-items-center gap-4">
      <div className="topbar-bell position-relative">
        <Bell size={22} />
        <span className="topbar-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">21</span>
      </div>
      <button
        className="btn btn-outline-secondary"
        style={{ minWidth: 120 }}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <div className="topbar-user d-flex align-items-center gap-2">
        <img src="https://i.pravatar.cc/40?img=3" alt="User" className="rounded-circle" width="36" height="36" />
        <span className="fw-semibold">Kareem mohamed</span>
      </div>
    </div>
  </div>
);

export default Topbar; 