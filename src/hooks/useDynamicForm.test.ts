// import { renderHook, act } from '@testing-library/react'; 
// import useDynamicForm from './useDynamicForm'; 

// describe('useDynamicForm Hook', () => {
//   test('initializes form values correctly', () => { 
//     const { result } = renderHook(() => useDynamicForm());
//     expect(result.current.formValues).toEqual({}); // Ensure that the form values are an (empty object)
//   });

//   test('updates form values on change', () => {
//     const { result } = renderHook(() => useDynamicForm()); // Render the hook to access its result object 

//     act(() => {
//       result.current.handleChange('username', 'john_doe'); // Update the form values with a username 
//     });

//     expect(result.current.formValues).toEqual({ username: 'john_doe' }); // Ensure that the form values are updated correctly
//   });

//   test('submits the form with the correct data', () => {
//     const consoleSpy = jest.spyOn(console, 'log'); // Spy on the console.log method to check the output 
//     const { result } = renderHook(() => useDynamicForm());

//     // Update form values
//     act(() => { // Update the form values with a username and password
//       result.current.handleChange('username', 'john_doe');
//       result.current.handleChange('password', 'secret123');
//     });

//     // Clear the consoleSpy before submitting the form (to ensure no previous calls are interfering)
//     consoleSpy.mockClear();

//     // Submit the form
//     act(() => {
//       const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent; // Create a mock event object with a preventDefault method 
//       result.current.handleSubmit(mockEvent); // Submit the form with the mock event
//     });

  
//     expect(consoleSpy).toHaveBeenCalledWith('Form Values:', { // Ensure that the form values are logged correctly
//       username: 'john_doe',
//       password: 'secret123',
//     });

//     consoleSpy.mockRestore(); // Clean up the spy after the test is complete 
//   });
// });
import { renderHook, act } from '@testing-library/react';
import useDynamicForm from './useDynamicForm';

// Mock formConfig
jest.mock('../config/formConfig.json', () => ({
  fields: [
    {
      type: 'text',
      name: 'fullName',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
      validation: {
        regex: '^[A-Za-z ]{3,}$',
        errorMessage: 'Full Name must be at least 3 characters and contain only letters and spaces.',
      },
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email address',
      required: true,
      validation: {
        regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        errorMessage: 'Please enter a valid email address.',
      },
    },
  ],
}));

describe('useDynamicForm Hook', () => {
  test('initializes form values and errors correctly', () => {
    const { result } = renderHook(() => useDynamicForm());
    expect(result.current.formValues).toEqual({});
    expect(result.current.errors).toEqual({});
  });

  test('updates form values and validates on change', () => {
    const { result } = renderHook(() => useDynamicForm());

    act(() => {
      result.current.handleChange('fullName', 'John Doe');
    });

    expect(result.current.formValues).toEqual({ fullName: 'John Doe' });
    expect(result.current.errors.fullName).toBe(''); // No error for valid input
  });

  test('sets error for invalid input', () => {
    const { result } = renderHook(() => useDynamicForm());

    act(() => {
      result.current.handleChange('fullName', 'J'); // Invalid input (less than 3 characters)
    });

    expect(result.current.errors.fullName).toBe(
      'Full Name must be at least 3 characters and contain only letters and spaces.'
    );
  });

  test('submits the form with validation', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { result } = renderHook(() => useDynamicForm());

    // Fill in valid data
    act(() => {
      result.current.handleChange('fullName', 'John Doe');
      result.current.handleChange('email', 'john.doe@example.com');
    });

    // Submit the form
    act(() => {
      const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;
      result.current.handleSubmit(mockEvent);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted successfully:', {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
    });

    consoleSpy.mockRestore();
  });

  test('prevents submission if validation fails', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { result } = renderHook(() => useDynamicForm());

    // Fill in invalid data
    act(() => {
      result.current.handleChange('fullName', 'J'); // Invalid input
    });

    // Submit the form
    act(() => {
      const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;
      result.current.handleSubmit(mockEvent);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Form has errors');
    consoleSpy.mockRestore();
  });
});