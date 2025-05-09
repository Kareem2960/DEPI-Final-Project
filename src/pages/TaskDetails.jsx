import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = ({ tasks }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  // Flatten all tasks from columns
  const allTasks = [...tasks.todo, ...tasks.inProgress, ...tasks.done];
  const task = allTasks.find(t => t.id === taskId);

  if (!task) return <div style={{ padding: 32 }}>Task not found.</div>;

  return (
    <div style={{ padding: 32, maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>&larr; Back</button>
      <h2>{task.title}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Tags:</strong> {task.tags && task.tags.join(', ')}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default TaskDetails; 