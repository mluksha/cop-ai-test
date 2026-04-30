import type { Task } from '../../../entities/task';

export const deleteTask = (tasks: Task[], taskId: string): Task[] => {
  return tasks.filter((task) => task.id !== taskId);
};
