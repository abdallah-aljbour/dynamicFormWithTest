import { renderHook, act } from '@testing-library/react'; 
import useDynamicForm from './useDynamicForm'; 

describe('useDynamicForm Hook', () => {
  test('initializes form values correctly', () => { 
    const { result } = renderHook(() => useDynamicForm());
    expect(result.current.formValues).toEqual({}); // Ensure that the form values are an (empty object)
  });

  test('updates form values on change', () => {
    const { result } = renderHook(() => useDynamicForm()); // Render the hook to access its result object 

    act(() => {
      result.current.handleChange('username', 'john_doe'); // Update the form values with a username 
    });

    expect(result.current.formValues).toEqual({ username: 'john_doe' }); // Ensure that the form values are updated correctly
  });

  test('submits the form with the correct data', () => {
    const consoleSpy = jest.spyOn(console, 'log'); // Spy on the console.log method to check the output 
    const { result } = renderHook(() => useDynamicForm());

    // Update form values
    act(() => { // Update the form values with a username and password
      result.current.handleChange('username', 'john_doe');
      result.current.handleChange('password', 'secret123');
    });

    // Clear the consoleSpy before submitting the form (to ensure no previous calls are interfering)
    consoleSpy.mockClear();

    // Submit the form
    act(() => {
      const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent; // Create a mock event object with a preventDefault method 
      result.current.handleSubmit(mockEvent); // Submit the form with the mock event
    });

  
    expect(consoleSpy).toHaveBeenCalledWith('Form Values:', { // Ensure that the form values are logged correctly
      username: 'john_doe',
      password: 'secret123',
    });

    consoleSpy.mockRestore(); // Clean up the spy after the test is complete 
  });
});