import { useState, useEffect } from 'react';
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
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name: string, value: string | boolean) => {
    const fieldConfig = formConfig.fields.find((field) => field.name === name);
    if (!fieldConfig) return true;

    let isValid = true;
    let errorMessage = '';

    // Validation for required fields
    if (fieldConfig.required) {
      if (value === '' || value === false || value === undefined) {
        isValid = false;
        errorMessage = fieldConfig.validation?.errorMessage || `${fieldConfig.label} is required`;
      }
    }

    // Additional regex validation if exists
    if (isValid && fieldConfig.validation?.regex && typeof value === 'string') {
      isValid = new RegExp(fieldConfig.validation.regex).test(value);
      if (!isValid) {
        errorMessage = fieldConfig.validation.errorMessage || 'Invalid input';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValid ? '' : errorMessage,
    }));

    return isValid;
  };

  useEffect(() => {
    // Check if all required fields are filled
    const allFieldsFilled = formConfig.fields.every((field) => {
      const value = formValues[field.name];
      if (field.required) {
        return value !== '' && value !== false && value !== undefined;
      }
      return true;
    });

    // Check if there are no errors
    const noErrors = Object.values(errors).every((error) => error === '');

    setIsFormValid(allFieldsFilled && noErrors);
  }, [formValues, errors]);

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
    isFormValid,
    fields: formConfig.fields as FieldConfig[],
  };
};

export default useDynamicForm;