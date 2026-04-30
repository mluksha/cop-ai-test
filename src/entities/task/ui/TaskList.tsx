import type { Task, TaskFilter } from '../model/types';
import { getEmptyState } from '../model/utils';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, filter, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    const emptyState = getEmptyState(filter);

    return (
      <ul className="task-list">
        <li className="empty-message">
          <span className="empty-icon" role="img" aria-label={emptyState.ariaLabel}>
            {emptyState.icon}
          </span>
          {emptyState.message}
        </li>
      </ul>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
