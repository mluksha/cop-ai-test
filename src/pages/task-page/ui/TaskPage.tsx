import { useCallback, useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { TaskList, filterTasks, getTaskProgress } from '../../../entities/task';
import type { Task, TaskFilter } from '../../../entities/task';
import { addTask, deleteTask, toggleTask, AddTaskForm, TaskFilter as TaskFilterControl, ThemeToggle } from '../../../features';
import { MAX_TASK_LENGTH, ProgressBar, STORAGE_KEY, readFromStorage, writeToStorage } from '../../../shared';

export function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(() => readFromStorage<Task[]>(STORAGE_KEY, []));
  const [newTask, setNewTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    writeToStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  const handleAddTask = useCallback(() => {
    const result = addTask(tasks, newTask);
    setTasks(result.updatedTasks);
    setNewTask(result.nextInputValue);
    setErrorMessage(result.errorMessage);
  }, [newTask, tasks]);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks((previousTasks) => deleteTask(previousTasks, taskId));
  }, []);

  const handleToggleTask = useCallback((taskId: string) => {
    setTasks((previousTasks) => toggleTask(previousTasks, taskId));
  }, []);

  const handleInputKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  }, [handleAddTask]);

  const visibleTasks = useMemo(() => filterTasks(tasks, filter), [filter, tasks]);
  const { remainingCount, completedCount, progressPercent } = useMemo(() => getTaskProgress(tasks), [tasks]);

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <main className="container">
        <header className="header-row">
          <h1>Task Manager</h1>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode((previous) => !previous)} />
        </header>

        <AddTaskForm
          value={newTask}
          maxLength={MAX_TASK_LENGTH}
          onValueChange={setNewTask}
          onSubmit={handleAddTask}
          onInputKeyDown={handleInputKeyDown}
        />

        {errorMessage && <p className="validation-error">{errorMessage}</p>}

        <TaskFilterControl filter={filter} onFilterChange={setFilter} />

        {tasks.length > 0 && <ProgressBar progressPercent={progressPercent} />}

        <TaskList tasks={visibleTasks} filter={filter} onToggle={handleToggleTask} onDelete={handleDeleteTask} />

        <footer className="task-count">
          {filter === 'all'
            ? `${remainingCount} of ${tasks.length} tasks remaining`
            : filter === 'completed'
              ? `${completedCount} completed`
              : `${remainingCount} pending`}
        </footer>
      </main>
    </div>
  );
}
