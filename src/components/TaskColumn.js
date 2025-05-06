import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Droppable } from 'react-beautiful-dnd';

function TaskColumn({ title, tasks, onAddTask, onUpdateTask, onDeleteTask, users }) {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: users && users.length > 0 ? users[0].avatar : '',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddTask) {
      onAddTask(title, newTask);
    }
    setShowModal(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: users && users.length > 0 ? users[0].avatar : '',
      dueDate: ''
    });
  };

  return (
    <div className="flex-fill mx-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">{title}</h6>
        <span className="badge bg-secondary">{tasks.length}</span>
      </div>
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`task-column ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} users={users} />
            ))}
            {provided.placeholder}
            <Button 
              variant="outline-primary" 
              className="w-100 mt-2 d-flex align-items-center justify-content-center"
              style={{ height: '40px' }}
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              New Task
            </Button>
          </div>
        )}
      </Droppable>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assignee</Form.Label>
              <Form.Select
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
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
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskColumn; 