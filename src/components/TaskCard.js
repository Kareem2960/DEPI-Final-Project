import React, { useState } from 'react';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

function TaskCard({ task, index, onUpdateTask, onDeleteTask, users }) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState({ ...task });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getAssigneeName = (avatar) => {
    if (!users) return avatar;
    const user = users.find(u => u.avatar === avatar);
    return user ? user.name : avatar;
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditTask({ ...task });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdateTask) {
      onUpdateTask(task.id, editTask);
    }
    setEditMode(false);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (onDeleteTask) {
      onDeleteTask(task.id);
    }
    setShowModal(false);
  };

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card 
              className={`mb-3 shadow-sm ${snapshot.isDragging ? 'dragging' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setShowModal(true)}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="mb-0">{task.title}</Card.Title>
                  <span className={`badge bg-${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
                <Card.Text className="text-muted small mb-3">
                  {task.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faCalendar} className="text-muted mr-2" />
                    <small className="text-muted">{task.dueDate}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUser} className="text-muted mr-2" />
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '25px', height: '25px' }}>
                      {task.assignee}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </Draggable>

      <Modal show={showModal} onHide={() => { setShowModal(false); setEditMode(false); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Task' : task.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editMode ? (
            <Form onSubmit={handleSave}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editTask.title}
                  onChange={e => setEditTask({ ...editTask, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editTask.description}
                  onChange={e => setEditTask({ ...editTask, description: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  value={editTask.priority}
                  onChange={e => setEditTask({ ...editTask, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Assignee</Form.Label>
                <Form.Select
                  value={editTask.assignee}
                  onChange={e => setEditTask({ ...editTask, assignee: e.target.value })}
                >
                  {users && users.map(user => (
                    <option key={user.id} value={user.avatar}>{user.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={editTask.dueDate}
                  onChange={e => setEditTask({ ...editTask, dueDate: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="secondary" onClick={() => setEditMode(false)} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          ) : (
            <>
              <div className="mb-3">
                <h6>Description</h6>
                <p className="text-muted">{task.description}</p>
              </div>
              <div className="mb-3">
                <h6>Priority</h6>
                <span className={`badge bg-${getPriorityColor(task.priority)}`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
              <div className="mb-3">
                <h6>Due Date</h6>
                <p className="text-muted">{task.dueDate}</p>
              </div>
              <div className="mb-3">
                <h6>Assignee</h6>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: '30px', height: '30px' }}>
                    {task.assignee}
                  </div>
                  <span>{getAssigneeName(task.assignee)}</span>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!editMode && (
            <>
              <Button variant="danger" onClick={handleDelete} className="me-auto">
                Delete
              </Button>
              <Button variant="primary" onClick={handleEdit}>
                Edit Task
              </Button>
            </>
          )}
          {editMode && null}
          <Button variant="secondary" onClick={() => { setShowModal(false); setEditMode(false); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskCard; 