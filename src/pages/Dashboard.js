import React, { useState } from 'react';
import '../styles/Dashboard.css';

const mockUser = { name: 'John Doe' };
const mockTasks = [
  { id: 1, title: 'Design homepage', status: 'To Do', due: '2024-06-10', priority: 'High', assignee: 'Alice' },
  { id: 2, title: 'Fix login bug', status: 'In Progress', due: '2024-06-08', priority: 'Medium', assignee: 'Bob' },
  { id: 3, title: 'Update docs', status: 'Done', due: '2024-06-05', priority: 'Low', assignee: 'John Doe' },
  { id: 4, title: 'Sprint planning', status: 'To Do', due: '2024-06-09', priority: 'High', assignee: 'Alice' },
  { id: 5, title: 'Review PR #42', status: 'In Progress', due: '2024-06-07', priority: 'Medium', assignee: 'John Doe' },
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

const Dashboard = () => {
  const [search, setSearch] = useState('');

  // Task summary calculations
  const totalTasks = mockTasks.length;
  const tasksByStatus = status => mockTasks.filter(t => t.status === status).length;
  const overdueTasks = mockTasks.filter(t => new Date(t.due) < new Date() && t.status !== 'Done');
  const dueToday = mockTasks.filter(t => t.due === new Date().toISOString().slice(0, 10));

  // Filtered tasks for Kanban and deadlines
  const filteredTasks = mockTasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  const upcomingDeadlines = [...filteredTasks]
    .filter(t => t.status !== 'Done')
    .sort((a, b) => new Date(a.due) - new Date(b.due))
    .slice(0, 5);

  return (
    <div className="dashboard-container">
      {/* Notifications */}
      <div className="dashboard-notifications">
        <span>🔔</span> You have {overdueTasks.length} overdue task(s)!
      </div>

      {/* Greeting and Quick Add */}
      <div className="dashboard-header">
        <div>
          <h2>Hello, {mockUser.name}!</h2>
          <p>Let's get things done today 🚀</p>
        </div>
        <button className="quick-add-btn">+ Add Task</button>
      </div>

      {/* Search and Filter */}
      <div className="dashboard-search">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Task Summary Widgets */}
      <div className="dashboard-widgets">
        <div className="widget">
          <h4>Total Tasks</h4>
          <span>{totalTasks}</span>
        </div>
        <div className="widget">
          <h4>To Do</h4>
          <span>{tasksByStatus('To Do')}</span>
        </div>
        <div className="widget">
          <h4>In Progress</h4>
          <span>{tasksByStatus('In Progress')}</span>
        </div>
        <div className="widget">
          <h4>Done</h4>
          <span>{tasksByStatus('Done')}</span>
        </div>
        <div className="widget">
          <h4>Overdue</h4>
          <span>{overdueTasks.length}</span>
        </div>
        <div className="widget">
          <h4>Due Today</h4>
          <span>{dueToday.length}</span>
        </div>
      </div>

      <div className="dashboard-main">
        {/* Upcoming Deadlines */}
        <div className="dashboard-section deadlines">
          <h3>Upcoming Deadlines</h3>
          <ul>
            {upcomingDeadlines.length === 0 && <li>No upcoming tasks</li>}
            {upcomingDeadlines.map(task => (
              <li key={task.id}>
                <span className={`priority ${task.priority.toLowerCase()}`}></span>
                <strong>{task.title}</strong> - due {task.due} ({task.status})
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-section activity">
          <h3>Recent Activity</h3>
          <ul>
            {mockActivity.map(act => (
              <li key={act.id}>{act.text} <span className="activity-time">{act.time}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dashboard-main">
        {/* Mini Kanban Board */}
        <div className="dashboard-section kanban">
          <h3>Task Board Preview</h3>
          <div className="kanban-board">
            {['To Do', 'In Progress', 'Done'].map(status => (
              <div className="kanban-column" key={status}>
                <h4>{status}</h4>
                <ul>
                  {filteredTasks.filter(t => t.status === status).map(task => (
                    <li key={task.id}>{task.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Team/Project Overview */}
        <div className="dashboard-section team">
          <h3>Team Overview</h3>
          <ul>
            {mockTeam.map(member => (
              <li key={member.name}>{member.name} - {member.tasks} task(s)</li>
            ))}
          </ul>
          <h3>Projects</h3>
          <ul>
            {mockProjects.map(proj => (
              <li key={proj.id}>{proj.name} <span className="project-progress">{proj.progress}%</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 