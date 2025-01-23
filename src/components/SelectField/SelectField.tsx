import React from 'react';

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string; // Add error prop
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  required,
  error, // Destructure error prop
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span style={{ color: 'red' }}>{error}</span>} {/* Display error message */}
    </div>
  );
};

export default SelectField;