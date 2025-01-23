import React from 'react';

interface CheckboxFieldProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  error?: string; // Add error prop
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  checked,
  onChange,
  required,
  error, // Destructure error prop
}) => {
  return (
    <div>
      <label htmlFor={name}>
        <input
          id={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
        />
        {label}
      </label>
      {error && <span style={{ color: 'red' }}>{error}</span>} {/* Display error message */}
    </div>
  );
};

export default CheckboxField;