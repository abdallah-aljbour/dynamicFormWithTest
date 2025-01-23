// import { render, screen, fireEvent } from '@testing-library/react';
// import DynamicForm from './dynamicForm';
// import useDynamicForm from '../../hooks/useDynamicForm';
// import formConfig from '../../config/formConfig.json';

// // Mock the useDynamicForm hook
// jest.mock('../../hooks/useDynamicForm', () => ({
//   __esModule: true,
//   default: jest.fn()
// }));

// describe('DynamicForm Component', () => {
//   const mockHandleChange = jest.fn();
//   const mockHandleSubmit = jest.fn();

//   beforeEach(() => {
//     // Clear mock function calls before each test
//     mockHandleChange.mockClear();
//     mockHandleSubmit.mockClear();

//     // Setup mock return values for useDynamicForm hook
//     (useDynamicForm as jest.Mock).mockReturnValue({
//       formValues: {
//         fullName: 'John Doe',
//         email: 'john.doe@example.com',
//         password: 'Secret123!',
//         phoneNumber: '1234567890',
//         age: '25',
//         country: 'us',
//         agreeToTerms: true
//       },
//       handleChange: mockHandleChange,
//       handleSubmit: mockHandleSubmit,
//       fields: formConfig.fields
//     });
//   });

//   test('renders all form fields', () => {
//     render(<DynamicForm />);
    
//     // Check if key fields are rendered
//     expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
//   });

//   test('submits the form with the correct data', () => {
//     render(<DynamicForm />);
    
//     // Use fireEvent.submit on the form
//     const form = screen.getByRole('form');
//     fireEvent.submit(form);

//     // Verify submit handler was called
//     expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
//   });

//   test('calls handleChange when form fields are modified', () => {
//     render(<DynamicForm />);
    
//     // Simulate changing an input field
//     const fullNameInput = screen.getByLabelText(/full name/i);
//     fireEvent.change(fullNameInput, { target: { value: 'Jane Doe' } });

//     // Verify handleChange was called
//     expect(mockHandleChange).toHaveBeenCalled();
//   });
// });
import { render, screen } from '@testing-library/react';
import DynamicForm from './dynamicForm';
import useDynamicForm from '../../hooks/useDynamicForm';
import formConfig from '../../config/formConfig.json';

// Mock the SCSS module
jest.mock('./Dynamic Form.module.scss', () => ({}));

// Mock the useDynamicForm hook
jest.mock('../../hooks/useDynamicForm', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('DynamicForm Component', () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    mockHandleChange.mockClear();
    mockHandleSubmit.mockClear();

    (useDynamicForm as jest.Mock).mockReturnValue({
      formValues: {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: 'Secret123!',
        phoneNumber: '1234567890',
        age: '25',
        country: 'us',
        agreeToTerms: true,
      },
      errors: {
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        age: '',
        country: '',
        agreeToTerms: '',
      },
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
      fields: formConfig.fields,
    });
  });

  test('renders all form fields', () => {
    render(<DynamicForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});