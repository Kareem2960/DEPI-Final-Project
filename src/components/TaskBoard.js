import React, { useState } from 'react';
import TaskColumn from './TaskColumn';
import { DragDropContext } from 'react-beautiful-dnd';

const initialColumns = [
  {
    title: 'TO DO',
    tasks: [
      {
        id: 1,
        title: 'High Priority',
        description: 'This is a high priority task',
        priority: 'high',
        assignee: 'CS',
        dueDate: '2024-03-20'
      },
      {
        id: 2,
        title: 'Medium Priority',
        description: 'This is a medium priority task',
        priority: 'medium',
        assignee: 'JD',
        dueDate: '2024-03-21'
      }
    ]
  },
  {
    title: 'IN WORK',
    tasks: [
      {
        id: 3,
        title: 'In Progress Task',
        description: 'This task is currently in progress',
        priority: 'high',
        assignee: 'JS',
        dueDate: '2024-03-19'
      }
    ]
  },
  {
    title: 'REVIEW',
    tasks: [
      {
        id: 4,
        title: 'Review Task',
        description: 'This task needs review',
        priority: 'medium',
        assignee: 'CS',
        dueDate: '2024-03-22'
      }
    ]
  },
  {
    title: 'DONE',
    tasks: [
      {
        id: 5,
        title: 'Completed Task',
        description: 'This task has been completed',
        priority: 'low',
        assignee: 'JD',
        dueDate: '2024-03-18'
      }
    ]
  }
];

function TaskBoard({ searchTerm = '', users }) {
  const [columns, setColumns] = useState(initialColumns);

  const filterTasks = (tasks) => {
    if (!searchTerm) return tasks;
    const term = searchTerm.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term) ||
      task.assignee.toLowerCase().includes(term)
    );
  };

  const handleAddTask = (columnTitle, newTask) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.title === columnTitle) {
          return {
            ...column,
            tasks: [
              ...column.tasks,
              {
                ...newTask,
                id: Date.now()
              }
            ]
          };
        }
        return column;
      });
    });
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    setColumns(prevColumns => prevColumns.map(column => ({
      ...column,
      tasks: column.tasks.map(task =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    })));
  };

  const handleDeleteTask = (taskId) => {
    setColumns(prevColumns => prevColumns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== taskId)
    })));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const column = columns.find(col => col.title === source.droppableId);
      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);

      setColumns(prevColumns => 
        prevColumns.map(col => 
          col.title === source.droppableId 
            ? { ...col, tasks: copiedTasks }
            : col
        )
      );
    } else {
      // Moving between columns
      const sourceColumn = columns.find(col => col.title === source.droppableId);
      const destColumn = columns.find(col => col.title === destination.droppableId);
      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setColumns(prevColumns => 
        prevColumns.map(col => {
          if (col.title === source.droppableId) {
            return { ...col, tasks: sourceTasks };
          }
          if (col.title === destination.droppableId) {
            return { ...col, tasks: destTasks };
          }
          return col;
        })
      );
    }
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: filterTasks(column.tasks)
  }));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="d-flex mt-3">
        {filteredColumns.map((column, idx) => (
          <TaskColumn 
            key={idx} 
            title={column.title} 
            tasks={column.tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            users={users}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default TaskBoard; 