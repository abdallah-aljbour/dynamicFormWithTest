import React from 'react';

interface CheckboxFieldProps { // Define the structure of the props that the component will receive
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  errorMessage?: string; // Error message for validation
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  checked,
  onChange,
  required,
  errorMessage,
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
          aria-invalid={!!errorMessage} // Indicate if the field is invalid
          aria-describedby={errorMessage ? `${name}-error` : undefined} // Link error message
        />
        {label}
      </label>
      {errorMessage && (
        <span id={`${name}-error`} style={{ color: 'red' }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default CheckboxField;