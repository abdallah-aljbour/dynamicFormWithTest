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