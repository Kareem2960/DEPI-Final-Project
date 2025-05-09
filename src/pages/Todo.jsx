import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "../context/AuthContext";
import styles from "./ToDoBoard.module.css";

const mockUsers = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

const initialTasks = {
  todo: [
    {
      id: "1",
      title: "Design new logo",
      description: "Create a modern logo for the company",
      priority: "High",
      dueDate: "2024-05-10",
      tags: ["Design", "Branding"],
      assignee: '1',
      color: '#e57373',
      comments: [],
      attachments: [],
      subtasks: [
        { id: 's1', text: 'Sketch ideas', done: true },
        { id: 's2', text: 'Create vector', done: false },
      ],
      activity: [],
      createdAt: Date.now(),
    },
    {
      id: "2",
      title: "Update website",
      description: "Update the homepage with new content",
      priority: "Medium",
      dueDate: "2024-05-15",
      tags: ["Development"],
    },
  ],
  inProgress: [
    {
      id: "3",
      title: "Write documentation",
      description: "Document the new API endpoints",
      priority: "Low",
      dueDate: "2024-05-20",
      tags: ["Documentation"],
    },
  ],
  done: [
    {
      id: "4",
      title: "Setup CI/CD",
      description: "Configure GitHub Actions for deployment",
      priority: "High",
      dueDate: "2024-05-05",
      tags: ["DevOps"],
    },
  ],
};

const ToDoBoard = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    tags: "",
    assignee: '',
    color: '#64b5f6',
    comments: [],
    attachments: [],
    subtasks: [],
    activity: [],
  });
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('dueDate');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [modalTask, setModalTask] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now().toString(),
      ...newTask,
      tags: newTask.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, task],
    }));

    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      tags: "",
    });
  };

  const handleEditTask = (taskId, columnId) => {
    const task = tasks[columnId].find((t) => t.id === taskId);
    setEditingTask({ ...task, columnId });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const { columnId, id, ...updatedTask } = editingTask;

    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    }));

    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId, columnId) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((task) => task.id !== taskId),
    }));
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;
    const sourceIndex = source.index;
    const destIndex = destination.index;

    if (sourceColumn === destColumn) {
      const column = tasks[sourceColumn];
      const [removed] = column.splice(sourceIndex, 1);
      column.splice(destIndex, 0, removed);
      setTasks({ ...tasks, [sourceColumn]: column });
    } else {
      const sourceColumnTasks = [...tasks[sourceColumn]];
      const destColumnTasks = [...tasks[destColumn]];
      const [removed] = sourceColumnTasks.splice(sourceIndex, 1);
      destColumnTasks.splice(destIndex, 0, removed);
      setTasks({
        ...tasks,
        [sourceColumn]: sourceColumnTasks,
        [destColumn]: destColumnTasks,
      });
    }
  };

  const filteredTasks = {
    todo: tasks.todo.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
    ),
    inProgress: tasks.inProgress.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
    ),
    done: tasks.done.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
    ),
  };

  // Filtering, sorting, and overdue highlighting logic will be added here

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ""}`}>
      <header className={styles.header}>
        <h1>Task Board</h1>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <select value={filter} onChange={e => setFilter(e.target.value)} className={styles.select}>
            <option value="all">All</option>
            <option value="overdue">Overdue</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className={styles.select}>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Created At</option>
          </select>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={styles.themeToggle}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <form onSubmit={handleAddTask} className={styles.addTaskForm}>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          className={styles.input}
        />
        <select
          value={newTask.priority}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, priority: e.target.value }))
          }
          className={styles.select}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={newTask.tags}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, tags: e.target.value }))
          }
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          Add Task
        </button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
          {Object.entries(filteredTasks).map(([columnId, columnTasks]) => (
            <div key={columnId} className={styles.column}>
              <h2>{columnId.charAt(0).toUpperCase() + columnId.slice(1)}</h2>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.taskList}
                  >
                    {columnTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.task}
                          >
                            {editingTask?.id === task.id ? (
                              <form
                                onSubmit={handleSaveEdit}
                                className={styles.editForm}
                              >
                                <input
                                  type="text"
                                  value={editingTask.title}
                                  onChange={(e) =>
                                    setEditingTask((prev) => ({
                                      ...prev,
                                      title: e.target.value,
                                    }))
                                  }
                                  className={styles.input}
                                />
                                <input
                                  type="text"
                                  value={editingTask.description}
                                  onChange={(e) =>
                                    setEditingTask((prev) => ({
                                      ...prev,
                                      description: e.target.value,
                                    }))
                                  }
                                  className={styles.input}
                                />
                                <select
                                  value={editingTask.priority}
                                  onChange={(e) =>
                                    setEditingTask((prev) => ({
                                      ...prev,
                                      priority: e.target.value,
                                    }))
                                  }
                                  className={styles.select}
                                >
                                  <option value="High">High Priority</option>
                                  <option value="Medium">
                                    Medium Priority
                                  </option>
                                  <option value="Low">Low Priority</option>
                                </select>
                                <input
                                  type="date"
                                  value={editingTask.dueDate}
                                  onChange={(e) =>
                                    setEditingTask((prev) => ({
                                      ...prev,
                                      dueDate: e.target.value,
                                    }))
                                  }
                                  className={styles.input}
                                />
                                <input
                                  type="text"
                                  value={editingTask.tags.join(", ")}
                                  onChange={(e) =>
                                    setEditingTask((prev) => ({
                                      ...prev,
                                      tags: e.target.value
                                        .split(",")
                                        .map((tag) => tag.trim()),
                                    }))
                                  }
                                  className={styles.input}
                                />
                                <div className={styles.editActions}>
                                  <button
                                    type="submit"
                                    className={styles.saveButton}
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingTask(null)}
                                    className={styles.cancelButton}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <div className={styles.taskMeta}>
                                  <span
                                    className={`${styles.priority} ${
                                      styles[task.priority.toLowerCase()]
                                    }`}
                                  >
                                    {task.priority}
                                  </span>
                                  {task.dueDate && (
                                    <span className={styles.dueDate}>
                                      Due:{" "}
                                      {new Date(
                                        task.dueDate
                                      ).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                                <div className={styles.tags}>
                                  {task.tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className={styles.taskActions}>
                                  <button
                                    onClick={() =>
                                      handleEditTask(task.id, columnId)
                                    }
                                    className={styles.editButton}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteTask(task.id, columnId)
                                    }
                                    className={styles.deleteButton}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ToDoBoard;
