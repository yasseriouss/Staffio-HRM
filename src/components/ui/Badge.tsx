import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'info', children, className = '', style }) => (
  <span className={`badge badge-${variant} ${className}`} style={style}>
    {children}
  </span>
);

export default Badge;
