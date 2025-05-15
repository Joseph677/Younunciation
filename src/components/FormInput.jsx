import { useState } from 'react';

// Reusable FormInput component that can be used across the app
const FormInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  pattern = null,
  errorMessage = 'Invalid input',
  validateInput = null,
  className = ''
}) => {
  const [error, setError] = useState('');
  
  // Custom validation function
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Always update the value first, then validate
    onChange(e);
    
    // If there's a custom validation function provided
    if (validateInput) {
      const validationError = validateInput(newValue);
      setError(validationError || '');
    } else {
      setError('');
    }
  };

  // Validation on blur for better UX
  const handleBlur = (e) => {
    const value = e.target.value;
    
    // If pattern is set, check if value matches the pattern
    if (pattern && value) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        setError(errorMessage);
      } else {
        setError('');
      }
    }
    
    // If there's a custom validation function, run it on blur as well
    if (validateInput && value) {
      const validationError = validateInput(value);
      setError(validationError || '');
    }
  };

  return (
    <div className={`form-input-container ${className}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        className={error ? 'input-error' : ''}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default FormInput;