import React from 'react';
import TaskColumn from './TaskColumn';

const columns = [
  { title: 'TO DO', tasks: [/* ... */] },
  { title: 'IN WORK', tasks: [/* ... */] },
  { title: 'REVIEW', tasks: [/* ... */] },
  { title: 'DONE', tasks: [/* ... */] },
];

function TaskBoard() {
  return (
    <div className="d-flex mt-3">
      {columns.map((col, idx) => (
        <TaskColumn key={idx} title={col.title} tasks={col.tasks} />
      ))}
    </div>
  );
}

export default TaskBoard;