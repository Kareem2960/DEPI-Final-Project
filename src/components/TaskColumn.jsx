import React from 'react';
import TaskCard from './TaskCard';

function TaskColumn({ title, tasks }) {
  return (
    <div className="flex-fill mx-2">
      <h6>{title}</h6>
      {tasks.map((task, idx) => (
        <TaskCard key={idx} task={task} />
      ))}
    </div>
  );
}

export default TaskColumn;