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