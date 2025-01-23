import { useState } from 'react';
import formConfig from '../config/formConfig.json';

interface FieldConfig { // Define the shape of the field configuration
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const useDynamicForm = () => {  // Create a custom hook for handling dynamic forms
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({}); // Initialize form values as an empty object

  const handleChange = (name: string, value: string) => { // Create a function to update form values
    setFormValues((prevValues) => ({ // Update the form values based on the input field name and value
      ...prevValues,
      [name]: value,
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