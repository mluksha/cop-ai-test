import { useState } from 'react'
import './App.css'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'completed' | 'pending';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTask = () => {
    const trimmedTask = newTask.trim();
    if (trimmedTask === '') return;
    const task: Task = {
      id: Date.now(),
      text: trimmedTask,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const remainingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="header-row">
          <h1>Task Manager</h1>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
        
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="task-input"
          />
          <button onClick={addTask} className="add-button">Add</button>
        </div>

        <div className="filter-buttons">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <li className="empty-message">
              {filter === 'all' ? 'No tasks yet. Add one above!' : 
               filter === 'completed' ? 'No completed tasks yet.' : 
               'No pending tasks.'}
            </li>
          ) : (
            filteredTasks.map(task => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <span className="task-text">{task.text}</span>
                <button 
                  onClick={() => deleteTask(task.id)} 
                  className="delete-button"
                  aria-label="Delete task"
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="task-count">
          {filter === 'all' 
            ? `${remainingCount} of ${tasks.length} tasks remaining`
            : filter === 'completed'
              ? `${tasks.length - remainingCount} completed`
              : `${remainingCount} pending`
          }
        </div>
      </div>
    </div>
  );
}

export default App
