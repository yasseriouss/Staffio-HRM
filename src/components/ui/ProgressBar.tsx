import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'luxury';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, variant = 'primary', className = '' }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`progress-container ${className}`}>
      <div className={`progress-fill ${variant === 'luxury' ? 'luxury' : ''}`} style={{ width: `${pct}%` }} />
    </div>
  );
};

export default ProgressBar;
