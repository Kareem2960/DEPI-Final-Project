import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import { HouseDoor, House, ListTask, Calendar as CalendarIcon } from 'react-bootstrap-icons';
import { Draggable } from 'react-beautiful-dnd';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sidebar d-flex flex-column p-3 bg-light" style={{ minHeight: '100vh', width: '220px' }}>
      <div className="sidebar-logo mb-4">
        <h3 className="fw-bold">Task management</h3>
      </div>
      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/" className={`d-flex align-items-center ${location.pathname === '/' ? 'active' : ''}`}>
          <HouseDoor className="me-2" /> Main
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard" className={`d-flex align-items-center ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <House className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/todo" className={`d-flex align-items-center ${location.pathname === '/todo' ? 'active' : ''}`}>
          <ListTask className="me-2" /> To Do Board
        </Nav.Link>
        <Nav.Link as={Link} to="/calendar" className={`d-flex align-items-center ${location.pathname === '/calendar' ? 'active' : ''}`}>
          <CalendarIcon className="me-2" /> Calendar
        </Nav.Link>
        <Nav.Link as={Link} to="/analytics" className={`d-flex align-items-center ${location.pathname === '/analytics' ? 'active' : ''}`}>
          <span className="me-2">📊</span> Analytics
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar; 