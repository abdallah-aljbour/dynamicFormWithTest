import React from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string; // Add error prop
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  required,
  error, // Destructure error prop
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>} {/* Display error message */}
    </div>
  );
};

export default InputField;