// import { render, screen, fireEvent } from '@testing-library/react';
// import CheckboxField from './CheckboxField';

// describe('CheckboxField Component', () => {
//   test('renders checkbox field with label', () => {
//     render(
//       <CheckboxField
//         name="agreeToTerms"
//         label="I agree to the terms and conditions"
//         checked={false}
//         onChange={() => {}}
//       />
//     );

//     // Check if the label is rendered
//     const labelElement = screen.getByText(/I agree to the terms and conditions/i); //i is used to make the search case-insensitive
//     expect(labelElement).toBeInTheDocument();  // Check if the label is rendered

//     // Check if the checkbox is rendered
//     const checkboxElement = screen.getByRole('checkbox'); // Check if the checkbox is rendered using the role attribute 
//     expect(checkboxElement).toBeInTheDocument();
//   });

//   test('calls onChange when the checkbox is toggled', () => {
//     const handleChange = jest.fn(); // Create a mock function to simulate onChange
//     render(
//       <CheckboxField
//         name="agreeToTerms"
//         label="I agree to the terms and conditions"
//         checked={false}
//         onChange={handleChange}
//       />
//     );

//     // Simulate toggling the checkbox
//     const checkboxElement = screen.getByRole('checkbox');
//     fireEvent.click(checkboxElement); // Simulate a click event on the checkbox

//     // Check if onChange was called with the correct value
//     expect(handleChange).toHaveBeenCalledWith(true);
//   });

//   test('displays error message when provided', () => {
//     const errorMessage = 'You must agree to the terms and conditions.';
//     render(
//       <CheckboxField
//         name="agreeToTerms"
//         label="I agree to the terms and conditions"
//         checked={false}
//         onChange={() => {}}
//         errorMessage={errorMessage}
//       />
//     );

//     // Check if the error message is displayed
//     const errorElement = screen.getByText(errorMessage);
//     expect(errorElement).toBeInTheDocument();
//     expect(errorElement).toHaveStyle({ color: 'red' });
//   });

//   test('marks the checkbox as required when required is true', () => {
//     render(
//       <CheckboxField
//         name="agreeToTerms"
//         label="I agree to the terms and conditions"
//         checked={false}
//         onChange={() => {}}
//         required
//       />
//     );

//     // Check if the checkbox is required
//     const checkboxElement = screen.getByRole('checkbox');
//     expect(checkboxElement).toBeRequired();
//   });
// });
import { render, screen } from '@testing-library/react';
import CheckboxField from './CheckboxField';

describe('CheckboxField Component', () => {
  test('renders checkbox field with label', () => {
    render(
      <CheckboxField
        name="agreeToTerms"
        label="I agree to the terms"
        checked={false}
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText(/i agree to the terms/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('displays error message when provided', () => {
    render(
      <CheckboxField
        name="agreeToTerms"
        label="I agree to the terms"
        checked={false}
        onChange={() => {}}
        error="You must agree to the terms"
      />
    );

    expect(screen.getByText(/you must agree to the terms/i)).toBeInTheDocument();
    expect(screen.getByText(/you must agree to the terms/i)).toHaveStyle({ color: 'red' });
  });
});