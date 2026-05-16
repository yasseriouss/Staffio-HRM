import React from 'react';

interface IndustrialCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// Alias kept for backward compat — renders as plain Card now
const IndustrialCard: React.FC<IndustrialCardProps> = ({ title, children, className = '' }) => (
  <div className={`card ${className}`}>
    {title && <h3 className="card-title">{title}</h3>}
    {children}
  </div>
);

export default IndustrialCard;
