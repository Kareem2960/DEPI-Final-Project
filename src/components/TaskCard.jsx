import React from 'react';
import { Card } from 'react-bootstrap';

function TaskCard({ task }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        {/* Add more task details here */}
      </Card.Body>
    </Card>
  );
}

export default TaskCard;