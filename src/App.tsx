import { useState, useCallback, useMemo, useEffect, memo } from 'react'
import './App.css'

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'completed' | 'pending';

const STORAGE_KEY = 'task-manager-tasks';
const MAX_TASK_LENGTH = 200;

// --- TaskItem sub-component ---
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="checkmark"></span>
      </label>
      <span className="task-text">{task.text}</span>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="delete-button"
        aria-label="Delete task"
      >
        ×
      </button>
    </li>
  );
});

// --- ProgressBar sub-component ---
interface ProgressBarProps {
  progressPercent: number;
}

const ProgressBar = memo(function ProgressBar({ progressPercent }: ProgressBarProps) {
  return (
    <div className="progress-bar-wrapper">
      <div className="progress-label">
        <span>Progress</span>
        <span>{progressPercent}%</span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );
});

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Task[]) : [];
    } catch {
      return [];
    }
  });
  const [newTask, setNewTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(() => {
    const trimmedTask = newTask.trim();

    if (trimmedTask === '') {
      setErrorMessage('Todo text cannot be empty');
      return;
    }

    const hasDuplicate = tasks.some(
      (task) => task.text.trim().toLowerCase() === trimmedTask.toLowerCase()
    );

    if (hasDuplicate) {
      setErrorMessage('This todo already exists');
      return;
    }

    const task: Task = {
      id: crypto.randomUUID(),
      text: trimmedTask,
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask('');
    setErrorMessage('');
  }, [newTask, tasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }, [addTask]);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  }), [tasks, filter]);

  const { remainingCount, progressPercent } = useMemo(() => {
    const remaining = tasks.filter((t) => !t.completed).length;
    const completed = tasks.length - remaining;
    const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
    return { remainingCount: remaining, progressPercent: percent };
  }, [tasks]);

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
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="task-input"
            maxLength={MAX_TASK_LENGTH}
          />
          <button type="button" onClick={addTask} className="add-button">Add</button>
        </div>
        {errorMessage && <p className="validation-error">{errorMessage}</p>}

        <div className="filter-buttons">
          <button
            type="button"
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            type="button"
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {tasks.length > 0 && <ProgressBar progressPercent={progressPercent} />}

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
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
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

