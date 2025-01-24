import React from 'react';
import './CheckboxField.scss';

interface CheckboxFieldProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  error?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  checked,
  onChange,
  required,
  error,
}) => {
  return (
    <div className={`checkbox-field ${error ? 'checkbox-field--error' : ''}`}>
      <div className="checkbox-field__container">
        <label htmlFor={name} className="checkbox-field__label">
          {label}
        </label>
        <input
          id={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          className={`checkbox-field__input ${error ? 'checkbox-field__error-input' : ''}`}
        />
      </div>
      {error && <span className="checkbox-field__error" style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default CheckboxField;