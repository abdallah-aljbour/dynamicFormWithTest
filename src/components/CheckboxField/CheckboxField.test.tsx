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