import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./ToDoBoard.module.css";

const initialTasks = [
  {
    id: "1",
    title: "Design login page",
    description: "Create a modern login UI",
    dueDate: "2024-05-10",
    priority: "High",
    status: "todo",
    avatar: "https://i.pravatar.cc/32?u=1",
    tags: ["UI", "Frontend"],
    comments: [
      { id: "c1", text: "Remember to use the new logo!", author: "Alice" },
    ],
    attachments: [
      // Example: { id: "a1", name: "spec.pdf", url: "https://..." }
    ],
    activity: [
      // Example: { id: "a1", text: "Task created", date: "2024-05-10 10:00" }
    ],
  },
  {
    id: "2",
    title: "Set up database",
    description: "Initialize MongoDB cluster",
    dueDate: "2024-05-12",
    priority: "Medium",
    status: "inprogress",
    avatar: "https://i.pravatar.cc/32?u=2",
    tags: ["Backend", "Database"],
    attachments: [
      // Example: { id: "a2", name: "database.sql", url: "https://..." }
    ],
    activity: [
      // Example: { id: "a2", text: "Task created", date: "2024-05-12 10:00" }
    ],
  },
  {
    id: "3",
    title: "Deploy to production",
    description: "Push to Vercel",
    dueDate: "2024-05-15",
    priority: "Low",
    status: "done",
    avatar: "https://i.pravatar.cc/32?u=3",
    tags: ["DevOps"],
    attachments: [
      // Example: { id: "a3", name: "deployment.sh", url: "https://..." }
    ],
    activity: [
      // Example: { id: "a3", text: "Task created", date: "2024-05-15 10:00" }
    ],
  },
];

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const users = [
  { id: "u1", name: "Alice", avatar: "https://i.pravatar.cc/32?u=alice" },
  { id: "u2", name: "Bob", avatar: "https://i.pravatar.cc/32?u=bob" },
];

export default function ToDoBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    tags: "",
  });

  const [editingTask, setEditingTask] = useState(null);
  const [editValue, setEditValue] = useState({});

  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("task-board-tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("task-board-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          ...newTask,
          status: "todo",
          avatar: `https://i.pravatar.cc/32?u=${Date.now()}`,
          tags: newTask.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          attachments: [],
          activity: [
            {
              id: Date.now().toString(),
              text: "Task created",
              date: new Date().toLocaleString(),
            },
          ],
        },
      ]);
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        tags: "",
      });
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditValue({
      ...task,
      tags: task.tags ? task.tags.join(", ") : "",
    });
  };

  const handleEditSave = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...editValue,
              tags: editValue.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
              activity: [
                ...(task.activity || []),
                {
                  id: Date.now().toString(),
                  text: "Task edited",
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : task
      )
    );
    setEditingTask(null);
    setEditValue({});
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;

    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === draggableId
          ? {
              ...task,
              status: destination.droppableId,
              activity: [
                ...(task.activity || []),
                {
                  id: Date.now().toString(),
                  text: `Status changed to: ${destination.droppableId}`,
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : task
      )
    );
  };

  const handleAddComment = (taskId, text) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              comments: [
                ...(task.comments || []),
                { id: Date.now().toString(), text },
              ],
              activity: [
                ...(task.activity || []),
                {
                  id: Date.now().toString(),
                  text: `Comment added: "${text}"`,
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : task
      )
    );
  };

  const handleDeleteComment = (taskId, commentId) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              comments: (task.comments || []).filter((c) => c.id !== commentId),
            }
          : task
      )
    );
  };

  const handleAddAttachment = (taskId, attachment) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              attachments: [...(task.attachments || []), attachment],
              activity: [
                ...(task.activity || []),
                {
                  id: Date.now().toString(),
                  text: `Attachment added: ${attachment.name}`,
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : task
      )
    );
  };

  const handleDeleteAttachment = (taskId, attachmentId) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          const attachment = (task.attachments || []).find(
            (a) => a.id === attachmentId
          );
          return {
            ...task,
            attachments: (task.attachments || []).filter(
              (a) => a.id !== attachmentId
            ),
            activity: [
              ...(task.activity || []),
              {
                id: Date.now().toString(),
                text: `Attachment deleted: ${
                  attachment ? attachment.name : ""
                }`,
                date: new Date().toLocaleString(),
              },
            ],
          };
        }
        return task;
      })
    );
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button
        onClick={() => setDarkMode((dm) => !dm)}
        className={styles.darkToggle}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((col) => (
          <Droppable droppableId={col.id} key={col.id}>
            {(provided) => (
              <div
                className={styles.column}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{col.title}</h3>
                {col.id === "todo" && (
                  <form onSubmit={handleAddTask} className={styles.addTaskForm}>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      placeholder="Task title"
                      required
                    />
                    <textarea
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                      placeholder="Description"
                    />
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                    />
                    <select
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({ ...newTask, priority: e.target.value })
                      }
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <input
                      type="text"
                      value={newTask.tags}
                      onChange={(e) =>
                        setNewTask({ ...newTask, tags: e.target.value })
                      }
                      placeholder="Tags (comma separated)"
                    />
                    <select
                      value={newTask.assignedTo || ""}
                      onChange={(e) =>
                        setNewTask({ ...newTask, assignedTo: e.target.value })
                      }
                    >
                      <option value="">Unassigned</option>
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                    <button type="submit">Add Task</button>
                  </form>
                )}
                {tasks
                  .filter((task) => task.status === col.id)
                  .filter(
                    (task) =>
                      task.title.toLowerCase().includes(search.toLowerCase()) ||
                      (task.tags &&
                        task.tags
                          .join(" ")
                          .toLowerCase()
                          .includes(search.toLowerCase()))
                  )
                  .map((task, idx) => (
                    <Draggable draggableId={task.id} index={idx} key={task.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {editingTask === task.id ? (
                            <div className={styles.editTaskForm}>
                              <input
                                value={editValue.title}
                                onChange={(e) =>
                                  setEditValue({
                                    ...editValue,
                                    title: e.target.value,
                                  })
                                }
                                required
                              />
                              <textarea
                                value={editValue.description}
                                onChange={(e) =>
                                  setEditValue({
                                    ...editValue,
                                    description: e.target.value,
                                  })
                                }
                              />
                              <input
                                type="date"
                                value={editValue.dueDate}
                                onChange={(e) =>
                                  setEditValue({
                                    ...editValue,
                                    dueDate: e.target.value,
                                  })
                                }
                              />
                              <select
                                value={editValue.priority}
                                onChange={(e) =>
                                  setEditValue({
                                    ...editValue,
                                    priority: e.target.value,
                                  })
                                }
                              >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                              <input
                                type="text"
                                value={editValue.tags}
                                onChange={(e) =>
                                  setEditValue({
                                    ...editValue,
                                    tags: e.target.value,
                                  })
                                }
                                placeholder="Tags (comma separated)"
                              />
                              <button onClick={() => handleEditSave(task.id)}>
                                Save
                              </button>
                              <button onClick={() => setEditingTask(null)}>
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <TaskCard
                              task={task}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                              onAddComment={handleAddComment}
                              onDeleteComment={handleDeleteComment}
                              onAddAttachment={handleAddAttachment}
                              onDeleteAttachment={handleDeleteAttachment}
                              users={users}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
