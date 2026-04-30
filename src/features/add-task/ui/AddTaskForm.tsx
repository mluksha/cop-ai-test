import type { KeyboardEvent } from 'react';

interface AddTaskFormProps {
  value: string;
  maxLength: number;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export function AddTaskForm({ value, maxLength, onValueChange, onSubmit, onInputKeyDown }: AddTaskFormProps) {
  return (
    <div className="input-group">
      <input
        type="text"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={onInputKeyDown}
        placeholder="Add a new task..."
        className="task-input"
        maxLength={maxLength}
      />
      <button type="button" onClick={onSubmit} className="add-button">
        Add
      </button>
    </div>
  );
}
