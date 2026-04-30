import type { Task } from '../../../entities/task';
import { isDuplicateTask } from '../../../entities/task';

interface AddTaskResult {
  updatedTasks: Task[];
  nextInputValue: string;
  errorMessage: string;
}

export const addTask = (tasks: Task[], inputValue: string): AddTaskResult => {
  const trimmedTask = inputValue.trim();

  if (trimmedTask === '') {
    return {
      updatedTasks: tasks,
      nextInputValue: inputValue,
      errorMessage: 'Todo text cannot be empty',
    };
  }

  if (isDuplicateTask(tasks, trimmedTask)) {
    return {
      updatedTasks: tasks,
      nextInputValue: inputValue,
      errorMessage: 'This todo already exists',
    };
  }

  const nextTask: Task = {
    id: crypto.randomUUID(),
    text: trimmedTask,
    completed: false,
  };

  return {
    updatedTasks: [...tasks, nextTask],
    nextInputValue: '',
    errorMessage: '',
  };
};
