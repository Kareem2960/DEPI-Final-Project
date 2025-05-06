import React from 'react';
import { Nav } from 'react-bootstrap';

function BoardTabs() {
  return (
    <Nav variant="tabs" defaultActiveKey="boards">
      <Nav.Item>
        <Nav.Link eventKey="list">List Tasks</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="boards">Boards</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="calendar">Calendar</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="gantt">Gantt</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="timeline">Timeline</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="activity">Activity</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default BoardTabs;