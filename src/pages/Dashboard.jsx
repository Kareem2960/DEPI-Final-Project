import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { Calendar, Clock, CheckCircle, ExclamationCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const mockUser = { name: 'John Doe' };
const mockTasks = [
  { id: 1, title: 'Design homepage', status: 'To Do', due: '2024-06-10', priority: 'High', assignee: 'Kareem' },
  { id: 2, title: 'Fix login bug', status: 'In Progress', due: '2024-06-08', priority: 'Medium', assignee: 'Omar' },
  { id: 3, title: 'Update docs', status: 'Done', due: '2024-06-05', priority: 'Low', assignee: 'Laila' },
  { id: 4, title: 'Sprint planning', status: 'To Do', due: '2024-06-09', priority: 'High', assignee: 'Aya' },

];
const mockActivity = [
  { id: 1, text: 'Alice created task "Design homepage"', time: '2h ago' },
  { id: 2, text: 'Bob moved "Fix login bug" to In Progress', time: '1h ago' },
  { id: 3, text: 'John Doe completed "Update docs"', time: '30m ago' },
];
const mockProjects = [
  { id: 1, name: 'Website Redesign', progress: 60 },
  { id: 2, name: 'Mobile App', progress: 30 },
];
const mockTeam = [
  { name: 'Alice', tasks: 2 },
  { name: 'Bob', tasks: 1 },
  { name: 'John Doe', tasks: 2 },
];

const Dashboard = ({ darkMode }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockTasks);
  const [events, setEvents] = useState([
    { id: 1, title: 'Client Meeting', date: '2024-03-20', time: '10:00', category: 'meeting' },
    { id: 2, title: 'Project Deadline', date: '2024-03-25', time: '17:00', category: 'task' }
  ]);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium' });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask.title,
        status: 'pending',
        priority: newTask.priority
      }]);
      setNewTask({ title: '', priority: 'medium' });
    }
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = total - completed;
    const highPriority = tasks.filter(task => task.priority === 'high').length;

    return { total, completed, pending, highPriority };
  };

  const stats = getTaskStats();

  return (
    <div className="dashboard">
      <Button variant="primary" style={{ marginBottom: 24 }} onClick={() => navigate('/todo')}>
        Go to To Do Board
      </Button>
      <h2 className="mb-4">Dashboard</h2>

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-primary text-white">
                  <CheckCircle size={24} />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0">Total Tasks</h6>
                  <h3 className="mb-0">{stats.total}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-success text-white">
                  <CheckCircle size={24} />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0">Completed</h6>
                  <h3 className="mb-0">{stats.completed}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-warning text-white">
                  <Clock size={24} />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0">Pending</h6>
                  <h3 className="mb-0">{stats.pending}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-danger text-white">
                  <ExclamationCircle size={24} />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0">High Priority</h6>
                  <h3 className="mb-0">{stats.highPriority}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Quick Task Creation */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Quick Task Creation</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddTask}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" variant="primary">Add Task</Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Task List */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Tasks</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {tasks.map(task => (
                <ListGroup.Item key={task.id} className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => toggleTaskStatus(task.id)}
                    className="me-3"
                  />
                  <div className="flex-grow-1">
                    <span className={task.status === 'completed' ? 'text-muted text-decoration-line-through' : ''}>
                      {task.title}
                    </span>
                    <span className={`badge ms-2 bg-${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'info'}`}>
                      {task.priority}
                    </span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Upcoming Events */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Upcoming Events</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {events.map(event => (
                <ListGroup.Item key={event.id}>
                  <div className="d-flex align-items-center">
                    <div className="event-icon me-3">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h6 className="mb-0">{event.title}</h6>
                      <small className="text-muted">
                        {event.date} at {event.time}
                      </small>
                    </div>
                    <span className={`badge ms-auto bg-${event.category === 'meeting' ? 'primary' : 'success'}`}>
                      {event.category}
                    </span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 