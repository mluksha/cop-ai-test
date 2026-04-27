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
  const completedCount = tasks.length - remainingCount;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="header-row">
          <h1>Task Manager</h1>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
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

        {tasks.length > 0 && (
          <div className="progress-bar-wrapper">
            <div className="progress-label">
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}

        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <li className="empty-message">
              <span
                className="empty-icon"
                role="img"
                aria-label={filter === 'completed' ? 'Party popper' : filter === 'pending' ? 'Check mark' : 'Notepad'}
              >
                {filter === 'completed' ? '🎉' : filter === 'pending' ? '✅' : '📝'}
              </span>
              {filter === 'all' ? 'No tasks yet. Add one above!' : 
               filter === 'completed' ? 'No completed tasks yet.' : 
               'No pending tasks. All done!'}
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
