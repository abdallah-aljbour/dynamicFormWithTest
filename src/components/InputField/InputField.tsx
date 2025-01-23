import React from 'react';

interface InputFieldProps { //this the structure of the props that the component will receive
  type: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  type,
  name,
  label,
  value,
  onChange, //this is a function that will be called when the input value changes
  placeholder,
  required,
}) => {
  return ( //
    <div>
      <label htmlFor={name}>{label}</label> 
      <input
        id={name} //id is used to associate the input field with the label
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;