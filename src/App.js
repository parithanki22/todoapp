import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), description: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (taskId, newDescription) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, description: newDescription } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter task description"
          value={newTask}
          onChange={handleTaskInputChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            <span
              onClick={() => {
                const newDescription = prompt('Edit task description:', task.description);
                if (newDescription !== null) {
                  editTask(task.id, newDescription);
                }
              }}
            >
              {task.description}
            </span> 
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="clear-button" onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

export default App;

