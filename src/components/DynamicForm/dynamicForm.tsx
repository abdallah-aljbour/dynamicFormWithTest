import React from 'react';
import useDynamicForm from '../../hooks/useDynamicForm';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import CheckboxField from '../CheckboxField/CheckboxField';
import Button from '../Button/Button';

const DynamicForm: React.FC = () => {
  const { formValues, handleChange, handleSubmit, fields } = useDynamicForm();
  
  return (
    <form onSubmit={handleSubmit} role="form">
      {fields.map((field) => {
        if (field.type === 'select') {
          return (
            <SelectField
              key={field.name}
              name={field.name}
              label={field.label}
              value={formValues[field.name] as string}
              onChange={(value) => handleChange(field.name, value)}
              options={field.options || []}
              required={field.required}
              errorMessage={field.validation?.errorMessage}
            />
          );
        } else if (field.type === 'checkbox') {
          return (
            <CheckboxField
              key={field.name}
              name={field.name}
              label={field.label}
              checked={!!formValues[field.name]}
              onChange={(value) => handleChange(field.name, value)}
              required={field.required}
              errorMessage={field.validation?.errorMessage}
            />
          );
        } else {
          return (
            <InputField
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              value={formValues[field.name] as string | number}
              onChange={(value) => handleChange(field.name, value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          );
        }
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DynamicForm;