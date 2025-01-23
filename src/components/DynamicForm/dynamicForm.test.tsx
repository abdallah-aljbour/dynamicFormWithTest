// import '@testing-library/jest-dom';
// import { render, screen, fireEvent } from '@testing-library/react';
// import DynamicForm from './dynamicForm';
// import useDynamicForm from '../../hooks/useDynamicForm';
// import formConfig from '../../config/formConfig.json';

// // Mock the useDynamicForm hook
// jest.mock('../../hooks/useDynamicForm');

// describe('DynamicForm Component', () => {
//   const mockHandleChange = jest.fn();
//   const mockHandleSubmit = jest.fn((e) => e.preventDefault());

//   const mockFormValues = {
//     username: 'john_doe',
//     password: 'secret123',
//   };

//   // Use the fields from formConfig.json
//   const mockFields = formConfig.fields;

//   beforeEach(() => {
//     // Mock the useDynamicForm hook implementation
//     (useDynamicForm as jest.Mock).mockReturnValue({
//       formValues: mockFormValues,
//       handleChange: mockHandleChange,
//       handleSubmit: mockHandleSubmit,
//       fields: mockFields,
//     });
//   });

//   test('renders all form fields dynamically', () => {
//     render(<DynamicForm />);

//     // Check if all fields are rendered
//     const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
//     const passwordInput = screen.getByPlaceholderText(/Enter your password/i);

//     expect(usernameInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//   });

//   test('updates form values when input changes', () => {
//     render(<DynamicForm />);

//     // Simulate typing in the username field
//     const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
//     fireEvent.change(usernameInput, { target: { value: 'new_username' } });

//     // Check if handleChange was called with the correct arguments
//     expect(mockHandleChange).toHaveBeenCalledWith('username', 'new_username');
//   });

//   test('submits the form with the correct data', () => {
//     render(<DynamicForm />);

//     // Simulate form submission
//     const submitButton = screen.getByText(/Submit/i);
//     fireEvent.click(submitButton);

//     // Check if handleSubmit was called
//     expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
//   });
// });
import { render, screen, fireEvent } from '@testing-library/react';
import DynamicForm from './dynamicForm';
import useDynamicForm from '../../hooks/useDynamicForm';
import formConfig from '../../config/formConfig.json';

// Mock the useDynamicForm hook
jest.mock('..//../hooks/useDynamicForm');

describe('DynamicForm Component', () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());

  const mockFormValues = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    password: 'secret123',
    phoneNumber: '1234567890',
    age: '25',
    country: 'us',
  };

  // Use the fields from formConfig.json
  const mockFields = formConfig.fields;

  beforeEach(() => {
    // Mock the useDynamicForm hook implementation
    (useDynamicForm as jest.Mock).mockReturnValue({
      formValues: mockFormValues,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      fields: mockFields,
    });
  });

  test('renders all form fields dynamically', () => {
    render(<DynamicForm />);

    // Check if all fields are rendered
    const fullNameInput = screen.getByPlaceholderText(/Enter your full name/i);
    const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const phoneNumberInput = screen.getByPlaceholderText(/Enter your phone number/i);
    const ageInput = screen.getByPlaceholderText(/Enter your age/i);
    const countrySelect = screen.getByLabelText(/Country/i);
    // const agreeToTermsCheckbox = screen.getByLabelText(/I agree to the terms and conditions/i);

    expect(fullNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
    expect(countrySelect).toBeInTheDocument();
    // expect(agreeToTermsCheckbox).toBeInTheDocument();
  });

  test('updates form values when input changes', () => {
    render(<DynamicForm />);

    // Simulate typing in the full name field
    const fullNameInput = screen.getByPlaceholderText(/Enter your full name/i);
    fireEvent.change(fullNameInput, { target: { value: 'Jane Doe' } });

    // Check if handleChange was called with the correct arguments
    expect(mockHandleChange).toHaveBeenCalledWith('fullName', 'Jane Doe');
  });

  test('submits the form with the correct data', () => {
    render(<DynamicForm />);

    // Simulate form submission
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Check if handleSubmit was called
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});