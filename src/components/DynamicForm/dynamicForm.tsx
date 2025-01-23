import React from 'react';
import useDynamicForm from '../../hooks/useDynamicForm';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import CheckboxField from '../CheckboxField/CheckboxField';
import Button from '../Button/Button';
import styles from './Dynamic Form.module.scss';

const DynamicForm: React.FC = () => {
  const { formValues, errors, handleChange, handleSubmit, fields } = useDynamicForm();

  return (
    <form onSubmit={handleSubmit} role="form" className={styles['dynamic-form']}>
      {fields.map((field) => {
        const baseClassName = `${styles['dynamic-form__field']} ${
          errors[field.name] ? styles['dynamic-form__field--error'] : ''
        }`;

        if (field.type === 'select') {
          return (
            <div key={field.name} className={baseClassName}>
              <SelectField
                name={field.name}
                label={field.label}
                value={formValues[field.name] as string}
                onChange={(value) => handleChange(field.name, value)}
                options={field.options || []}
                required={field.required}
                error={errors[field.name]} // Pass error prop
              />
            </div>
          );
        } else if (field.type === 'checkbox') {
          return (
            <div key={field.name} className={baseClassName}>
              <CheckboxField
                name={field.name}
                label={field.label}
                checked={!!formValues[field.name]}
                onChange={(value) => handleChange(field.name, value)}
                required={field.required}
                error={errors[field.name]} // Pass error prop
              />
            </div>
          );
        } else {
          return (
            <div key={field.name} className={baseClassName}>
              <InputField
                type={field.type}
                name={field.name}
                label={field.label}
                value={formValues[field.name] as string | number}
                onChange={(value) => handleChange(field.name, value)}
                placeholder={field.placeholder}
                required={field.required}
                error={errors[field.name]} // Pass error prop
              />
            </div>
          );
        }
      })}
      <div className={styles['dynamic-form__submit']}>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default DynamicForm;