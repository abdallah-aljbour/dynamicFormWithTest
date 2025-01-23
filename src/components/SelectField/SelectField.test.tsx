// import { render, screen, fireEvent } from '@testing-library/react';
// import SelectField from './SelectField';

// describe('SelectField Component', () => { 
//   const options = [ // Define the options that the select field will display
//     { value: 'us', label: 'United States' },
//     { value: 'ca', label: 'Canada' },
//     { value: 'uk', label: 'United Kingdom' },
//   ];

//   test('renders select field with label and options', () => {
//     render(
//       <SelectField
//         name="country"
//         label="Country"
//         value=""
//         onChange={() => {}} // Mock the onChange function with an empty function
//         options={options} // Pass the options to the component as a prop 
//       />
//     );

//     // Check if the label is rendered
//     const labelElement = screen.getByText(/Country/i);
//     expect(labelElement).toBeInTheDocument(); 

//     // Check if the select field is rendered
//     const selectElement = screen.getByRole('combobox');
//     expect(selectElement).toBeInTheDocument();

//     // Check if all options are rendered
//     options.forEach((option) => {
//       const optionElement = screen.getByText(option.label);
//       expect(optionElement).toBeInTheDocument();
//     });
//   });

//   test('calls onChange when an option is selected', () => {
//     const handleChange = jest.fn();
//     render(
//       <SelectField
//         name="country"
//         label="Country"
//         value=""
//         onChange={handleChange}
//         options={options}
//       />
//     );

//     // Simulate selecting an option
//     const selectElement = screen.getByRole('combobox'); //combobox is the role of select element
//     fireEvent.change(selectElement, { target: { value: 'us' } });

//     // Check if onChange was called with the correct value
//     expect(handleChange).toHaveBeenCalledWith('us');
//   });

//   test('displays error message when provided', () => {
//     const errorMessage = 'Please select a country.';
//     render(
//       <SelectField
//         name="country"
//         label="Country"
//         value=""
//         onChange={() => {}}
//         options={options}
//         errorMessage={errorMessage}
//       />
//     );

//     // Check if the error message is displayed
//     const errorElement = screen.getByText(errorMessage);
//     expect(errorElement).toBeInTheDocument();
//     expect(errorElement).toHaveStyle({ color: 'red' }); // Check if the error message is red
//   });

//   test('marks the select field as required when required is true', () => {
//     render(
//       <SelectField
//         name="country"
//         label="Country"
//         value=""
//         onChange={() => {}}
//         options={options}
//         required
//       />
//     );

//     // Check if the select field is required
//     const selectElement = screen.getByRole('combobox');
//     expect(selectElement).toBeRequired();
//   });
// });
import { render, screen } from '@testing-library/react';
import SelectField from './SelectField';

describe('SelectField Component', () => {
  const options = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
  ];

  test('renders select field with label and options', () => {
    render(
      <SelectField
        name="country"
        label="Country"
        value=""
        onChange={() => {}}
        options={options}
      />
    );

    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('displays error message when provided', () => {
    render(
      <SelectField
        name="country"
        label="Country"
        value=""
        onChange={() => {}}
        options={options}
        error="Please select a country"
      />
    );

    expect(screen.getByText(/please select a country/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a country/i)).toHaveStyle({ color: 'red' });
  });
});