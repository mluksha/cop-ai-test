import type { TaskFilter } from '../../../entities/task';

interface TaskFilterProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export function TaskFilter({ filter, onFilterChange }: TaskFilterProps) {
  return (
    <div className="filter-buttons">
      <button
        type="button"
        className={`filter-button ${filter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        type="button"
        className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
        onClick={() => onFilterChange('pending')}
      >
        Pending
      </button>
      <button
        type="button"
        className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
    </div>
  );
}
