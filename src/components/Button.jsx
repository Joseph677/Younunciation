import { useState } from 'react';

// Reusable Button component that can be used across the app
const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false,
  variant = 'primary', // primary, secondary, danger, etc.
  size = 'medium', // small, medium, large
  className = '',
  fullWidth = false
}) => {
  const [isActive, setIsActive] = useState(false);
  
  // Styles based on variants
  const getVariantClass = () => {
    switch(variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'danger':
        return 'btn-danger';
      case 'outline':
        return 'btn-outline';
      case 'text':
        return 'btn-text';
      default:
        return 'btn-primary';
    }
  };
  
  // Styles based on size
  const getSizeClass = () => {
    switch(size) {
      case 'small':
        return 'btn-small';
      case 'large':
        return 'btn-large';
      default:
        return 'btn-medium';
    }
  };
  
  const handleClick = (e) => {
    if (onClick && !disabled) {
      onClick(e);
    }
  };
  
  const buttonClasses = [
    'btn',
    getVariantClass(),
    getSizeClass(),
    fullWidth ? 'btn-full-width' : '',
    disabled ? 'btn-disabled' : '',
    isActive ? 'btn-active' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
    >
      {children}
    </button>
  );
};

export default Button;