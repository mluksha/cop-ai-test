import { memo } from 'react';

interface ProgressBarProps {
  progressPercent: number;
}

export const ProgressBar = memo(function ProgressBar({ progressPercent }: ProgressBarProps) {
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
