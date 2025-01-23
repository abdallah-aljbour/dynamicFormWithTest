import { useState } from 'react';
import formConfig from '../config/formConfig.json';

interface FieldConfig {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    regex?: string;
    errorMessage?: string;
  };
}

const useDynamicForm = () => {
  const [formValues, setFormValues] = useState<{ [key: string]: string | boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string | boolean) => {
    const fieldConfig = formConfig.fields.find((field) => field.name === name);
    if (!fieldConfig || !fieldConfig.validation) return true;

    const { regex, errorMessage } = fieldConfig.validation;

    if (typeof value === 'string' && regex) {
      const isValid = new RegExp(regex).test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValid ? '' : errorMessage || 'Invalid input',
      }));
      return isValid;
    }

    if (typeof value === 'boolean' && fieldConfig.required) {
      const isValid = value === true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValid ? '' : errorMessage || 'This field is required',
      }));
      return isValid;
    }

    return true;
  };

  const handleChange = (name: string, value: string | boolean) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    formConfig.fields.forEach((field) => {
      const fieldValue = formValues[field.name];
      if (!validateField(field.name, fieldValue)) {
        isValid = false;
      }
    });

    if (isValid) {
      console.log('Form submitted successfully:', formValues);
    } else {
      console.log('Form has errors');
    }
  };

  return {
    formValues,
    errors,
    handleChange,
    handleSubmit,
    fields: formConfig.fields as FieldConfig[],
  };
};

export default useDynamicForm;