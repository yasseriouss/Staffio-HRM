import React from 'react';

interface AvatarProps {
  src?: string;
  initials?: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, initials, size = 40, className = '' }) => (
  <div
    className={`avatar ${className}`}
    style={{ width: size, height: size, fontSize: size / 2.8 }}
  >
    {src
      ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
      : initials}
  </div>
);

export default Avatar;
