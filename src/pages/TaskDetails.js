import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/TaskDetails.css';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState({
    id: taskId,
    title: 'Design System Update',
    description: 'Update the design system to match the new brand guidelines and improve component consistency.',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-05-15',
    assignee: 'John Doe',
    createdAt: '2024-05-01',
    updatedAt: '2024-05-05',
    comments: [
      {
        id: 1,
        user: 'John Doe',
        content: 'Started working on the color palette updates.',
        timestamp: '2024-05-05 10:30 AM',
      },
      {
        id: 2,
        user: 'Jane Smith',
        content: 'Please make sure to update the typography section as well.',
        timestamp: '2024-05-05 11:45 AM',
      },
    ],
  });

  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: task.comments.length + 1,
        user: 'Current User',
        content: newComment,
        timestamp: new Date().toLocaleString(),
      };
      setTask({
        ...task,
        comments: [...task.comments, comment],
      });
      setNewComment('');
    }
  };

  const handleSave = () => {
    setTask(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  return (
    <div className="task-details-container">
      <div className="task-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && (
            <button className="btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="task-content">
        <div className="task-main">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editedTask.status}
                    onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={editedTask.dueDate}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Assignee</label>
                  <input
                    type="text"
                    value={editedTask.assignee}
                    onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1>{task.title}</h1>
              <p className="task-description">{task.description}</p>
              <div className="task-meta">
                <div className="meta-item">
                  <span className="meta-label">Status:</span>
                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Priority:</span>
                  <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Due Date:</span>
                  <span>{task.dueDate}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Assignee:</span>
                  <span>{task.assignee}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="task-sidebar">
          <div className="sidebar-section">
            <h3>Task Details</h3>
            <div className="detail-item">
              <span className="detail-label">Created</span>
              <span className="detail-value">{task.createdAt}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Updated</span>
              <span className="detail-value">{task.updatedAt}</span>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Comments</h3>
            <div className="comments-list">
              {task.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-user">{comment.user}</span>
                    <span className="comment-time">{comment.timestamp}</span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
              />
              <button type="submit" className="btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails; 