import type { Task } from '../../../entities/task';

export const toggleTask = (tasks: Task[], taskId: string): Task[] => {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      completed: !task.completed,
    };
  });
};
