// import React from 'react';
// import useDynamicForm from '../../hooks/useDynamicForm';
// import InputField from '../InputField/InputField';
// import Button from '../Button/Button';
 

// const DynamicForm: React.FC = () => {
//   const { formValues, handleChange, handleSubmit, fields } = useDynamicForm(); // Destructure values from the hook

//   return (
//     <form onSubmit={handleSubmit}>
//       {fields.map((field) => ( // Dynamically render InputField components based on the formConfig
//         <InputField
//           key={field.name} // Use the field name as the key
//           type={field.type}
//           name={field.name}
//           label={field.label}
//           value={formValues[field.name] || ''} // Use the form value for the field (or an empty string if not set)
//           onChange={(value) => handleChange(field.name, value)} // Pass the field name and value to handleChange
//           placeholder={field.placeholder}
//           required={field.required}
//         />
//       ))}
//       <Button type="submit">Submit</Button> {/* Render the submit button */}
//     </form>
//   );
// };

// export default DynamicForm;
import React from 'react';
import useDynamicForm from '../../hooks/useDynamicForm';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import Button from '../Button/Button';

const DynamicForm: React.FC = () => {
  const { formValues, handleChange, handleSubmit, fields } = useDynamicForm();

  return (
    <form onSubmit={handleSubmit}>
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
              errorMessage={"Please select an option."} 
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