import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField Component', () => {
  test('renders input field with label and placeholder', () => {
    render(
      <InputField
        type="text"
        name="fullName"
        label="Full Name"
        value=""
        onChange={() => {}}
        placeholder="Enter your name"
      />
    );

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  });

  test('updates input field value on change', () => {
    let inputValue = '';
    const handleChange = (value: string) => {
      inputValue = value;
    };

    render(
      <InputField
        type="text"
        name="fullName"
        label="Full Name"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter your name"
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
      target: { value: 'John Doe' },
    });
    expect(inputValue).toBe('John Doe');
  });

  test('displays error message when provided', () => {
    render(
      <InputField
        type="text"
        name="fullName"
        label="Full Name"
        value=""
        onChange={() => {}}
        placeholder="Enter your name"
        error="Full Name is required"
      />
    );

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/full name is required/i)).toHaveStyle({ color: 'red' });
  });
});