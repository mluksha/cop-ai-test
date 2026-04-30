import type { Task, TaskFilter } from './types';

interface TaskProgress {
  remainingCount: number;
  completedCount: number;
  progressPercent: number;
}

interface EmptyState {
  icon: string;
  ariaLabel: string;
  message: string;
}

export const isDuplicateTask = (tasks: Task[], text: string): boolean => {
  const normalizedText = text.trim().toLowerCase();
  return tasks.some((task) => task.text.trim().toLowerCase() === normalizedText);
};

export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  }

  if (filter === 'pending') {
    return tasks.filter((task) => !task.completed);
  }

  return tasks;
};

export const getTaskProgress = (tasks: Task[]): TaskProgress => {
  const remainingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - remainingCount;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return {
    remainingCount,
    completedCount,
    progressPercent,
  };
};

export const getEmptyState = (filter: TaskFilter): EmptyState => {
  if (filter === 'completed') {
    return {
      icon: '🎉',
      ariaLabel: 'Party popper',
      message: 'No completed tasks yet.',
    };
  }

  if (filter === 'pending') {
    return {
      icon: '✅',
      ariaLabel: 'Check mark',
      message: 'No pending tasks. All done!',
    };
  }

  return {
    icon: '📝',
    ariaLabel: 'Notepad',
    message: 'No tasks yet. Add one above!',
  };
};
