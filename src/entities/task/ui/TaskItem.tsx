import { memo } from 'react';

import type { Task } from '../model/types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
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
