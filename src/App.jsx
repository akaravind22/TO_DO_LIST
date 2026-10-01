import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  // Mark Task as Completed
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Count Completed Tasks
  const completedCount = tasks.filter(
    (t) => t.completed
  ).length;

  return (
    <div className="container">
      <h1>My To-Do List</h1>

      {/* Input Section */}
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />

        <button onClick={addTask}>Add</button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <div className="task-item">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t.id)}
              />

              <span className={t.completed ? "completed" : ""}>
                {t.name}
              </span>
            </div>

            <button
              className="delete"
              onClick={() => deleteTask(t.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Task Statistics */}
      <div className="stats">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed: {completedCount}</p>
        <p>Pending: {tasks.length - completedCount}</p>
      </div>
    </div>
  );
}

export default App;