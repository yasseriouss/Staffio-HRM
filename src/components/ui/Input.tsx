import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-10-regular uppercase tracking-wider text-muted font-bold">{label}</label>}
      <input 
        className={`input ${className}`}
        {...props}
      />
      {error && <span className="text-10-regular text-error">{error}</span>}
    </div>
  );
};

export default Input;
