import React, { useState } from "react";
import styles from "./TaskCard.module.css";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onAddComment,
  onDeleteComment,
  onAddAttachment,
  onDeleteAttachment,
  users,
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [attachmentInput, setAttachmentInput] = useState(null);
  const [showActivity, setShowActivity] = useState(false);

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const isDueSoon =
    task.dueDate &&
    !isOverdue &&
    new Date(task.dueDate) - new Date() < 3 * 24 * 60 * 60 * 1000;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      onAddComment(task.id, commentInput);
      setCommentInput("");
    }
  };

  const handleAddAttachment = (e) => {
    e.preventDefault();
    if (attachmentInput && attachmentInput.files.length > 0) {
      const file = attachmentInput.files[0];
      onAddAttachment(task.id, {
        id: Date.now().toString(),
        name: file.name,
        url: URL.createObjectURL(file),
      });
      attachmentInput.value = "";
    }
  };

  return (
    <div
      className={`${styles.card} ${
        isOverdue ? styles.overdue : isDueSoon ? styles.dueSoon : ""
      }`}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        {task.avatar && (
          <img src={task.avatar} alt="avatar" className={styles.avatar} />
        )}
        {task.assignedTo && (
          <img
            src={users.find((u) => u.id === task.assignedTo)?.avatar}
            alt="assigned user"
            className={styles.avatar}
            title={users.find((u) => u.id === task.assignedTo)?.name}
          />
        )}
        <div className={styles.title}>{task.title}</div>
      </div>
      <div className={styles.description}>{task.description}</div>
      <div className={styles.details}>
        <span className={styles.dueDate}>Due: {task.dueDate}</span>
        <span
          className={`${styles.priority} ${
            styles[task.priority.toLowerCase()]
          }`}
        >
          {task.priority}
        </span>
      </div>
      {task.tags && (
        <div className={styles.tags}>
          {task.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {task.checklist && task.checklist.length > 0 && (
        <div className={styles.checklist}>
          {task.checklist.map((item) => (
            <div key={item.id} className={styles.checklistItem}>
              <input type="checkbox" checked={item.done} readOnly />
              <span className={item.done ? styles.checked : ""}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className={styles.actions}>
        <button onClick={() => onEdit(task)} className={styles.editBtn}>
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className={styles.deleteBtn}>
          Delete
        </button>
        <button
          onClick={() => setShowComments((v) => !v)}
          className={styles.editBtn}
        >
          {showComments ? "Hide Comments" : "Comments"}
        </button>
        <button
          onClick={() => setShowActivity((v) => !v)}
          className={styles.editBtn}
        >
          {showActivity ? "Hide Activity" : "Activity Log"}
        </button>
      </div>
      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.commentsList}>
            {task.comments && task.comments.length > 0 ? (
              task.comments.map((c) => (
                <div key={c.id} className={styles.comment}>
                  <span>{c.text}</span>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDeleteComment(task.id, c.id)}
                  >
                    x
                  </button>
                </div>
              ))
            ) : (
              <div className={styles.noComments}>No comments yet.</div>
            )}
          </div>
          <form onSubmit={handleAddComment} className={styles.commentForm}>
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit" className={styles.editBtn}>
              Add
            </button>
          </form>
        </div>
      )}
      {showActivity && (
        <div className={styles.activitySection}>
          <div className={styles.activityList}>
            {task.activity && task.activity.length > 0 ? (
              task.activity.map((a) => (
                <div key={a.id} className={styles.activityItem}>
                  <span>{a.text}</span>
                  <span className={styles.activityDate}>{a.date}</span>
                </div>
              ))
            ) : (
              <div className={styles.noActivity}>No activity yet.</div>
            )}
          </div>
        </div>
      )}
      <span className={`${styles.statusBadge} ${styles[task.status]}`}>
        {task.status.replace(/^\w/, (c) => c.toUpperCase())}
      </span>
    </div>
  );
}
