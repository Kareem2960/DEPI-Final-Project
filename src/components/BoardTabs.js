import React from 'react';
import { Nav } from 'react-bootstrap';

function BoardTabs() {
  return (
    <div className="mb-3">
      <Nav variant="tabs" defaultActiveKey="boards">
        <Nav.Item>
          <Nav.Link eventKey="list" className="text-dark">List Tasks</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="boards" className="text-dark">Boards</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="calendar" className="text-dark">Calendar</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="gantt" className="text-dark">Gantt</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="timeline" className="text-dark">Timeline</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="activity" className="text-dark">Activity</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default BoardTabs; 