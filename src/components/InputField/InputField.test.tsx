import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField Component', () => {
  test('renders input field with label and placeholder', () => {
    render(
      <InputField
        type="text"
        name="username"
        label="Username"
        value=""
        onChange={() => {}}
        placeholder="Enter your username"
      />
    );

    // Check if the label is rendered
    const labelElement = screen.getByText(/Username/i);
    expect(labelElement).toBeInTheDocument();

    // Check if the input field is rendered with the correct placeholder
    const inputElement = screen.getByPlaceholderText(/Enter your username/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('updates input field value on change', () => {
    let inputValue = '';
    const handleChange = (value: string) => {
      inputValue = value;
    };

    render(
      <InputField
        type="text"
        name="username"
        label="Username"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter your username"
      />
    );

    // Simulate typing in the input field
    const inputElement = screen.getByPlaceholderText(/Enter your username/i);
    fireEvent.change(inputElement, { target: { value: 'john_doe' } });

    // Check if the input value is updated
    expect(inputValue).toBe('john_doe');
  });

  test('renders required input field', () => {
    render(
      <InputField
        type="text"
        name="username"
        label="Username"
        value=""
        onChange={() => {}}
        placeholder="Enter your username"
        required
      />
    );

    // Check if the input field is required
    const inputElement = screen.getByPlaceholderText(/Enter your username/i);
    expect(inputElement).toBeRequired();
  });
});