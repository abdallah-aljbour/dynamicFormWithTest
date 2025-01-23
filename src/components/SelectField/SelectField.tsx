import React from 'react';

interface SelectFieldProps { // Define the props that the component will receive
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  errorMessage?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ // Define the component and its props type using the interface defined above 
  name,
  label,
  value,
  onChange,
  options,
  required,
  errorMessage,
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
      {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
    </div>
  );
};

export default SelectField;