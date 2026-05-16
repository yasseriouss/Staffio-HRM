import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', style }) => (
  <div className={`card ${className}`} style={style}>
    {title && <h3 className="card-title">{title}</h3>}
    {children}
  </div>
);

export default Card;
