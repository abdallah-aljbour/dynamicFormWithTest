import { useState } from 'react';
import formConfig from '../config/formConfig.json';

interface FieldConfig { // Define the structure of the form fields
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{
    value: string;
    label: string;
  }>;
  validation?: {
    regex?: string;
    errorMessage?: string;
  };
}

const useDynamicForm = () => {  // Create a custom hook for handling dynamic forms
  const [formValues, setFormValues] = useState<{ [key: string]: string | boolean }>({}); // Initialize form values as an empty object

  const handleChange = (name: string, value: string | boolean) => { // Create a function to handle form field changes
    setFormValues((prevValues) => ({
      ...prevValues, // Spread the previous form values
      [name]: value, // Update the form field with the new value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => { // Create a function to handle form submission
    e.preventDefault();
    console.log('Form Values:', formValues); // Ensure this matches the expected format
  };

  return {
    formValues,
    handleChange,
    handleSubmit,
    fields: formConfig.fields as FieldConfig[], // Return the form fields from the form configuration file as FieldConfig[] 
  };
};

export default useDynamicForm;