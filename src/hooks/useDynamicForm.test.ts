import { renderHook, act } from '@testing-library/react';
import useDynamicForm from '../hooks/useDynamicForm';

describe('useDynamicForm Hook', () => {
  it('initializes with empty form values', () => {
    const { result } = renderHook(() => useDynamicForm());
    expect(result.current.formValues).toEqual({});
  });

  it('handles field changes', () => {
    const { result } = renderHook(() => useDynamicForm());
    
    act(() => {
      result.current.handleChange('fullName', 'John Doe');
    });

    expect(result.current.formValues.fullName).toBe('John Doe');
  });

  it('validates required fields', () => {
    const { result } = renderHook(() => useDynamicForm());
    
    act(() => {
      result.current.handleChange('fullName', '');
    });

    expect(result.current.errors.fullName).toBe('Full Name must be at least 3 characters and contain only letters and spaces.');
  });

  it('validates regex patterns', () => {
    const { result } = renderHook(() => useDynamicForm());
    
    act(() => {
      result.current.handleChange('email', 'invalid-email');
    });

    expect(result.current.errors.email).toBe('Please enter a valid email address.');
  });

  it('sets form validity', () => {
    const { result } = renderHook(() => useDynamicForm());
    
    act(() => {
      result.current.handleChange('fullName', 'John Doe');
      result.current.handleChange('email', 'john@example.com');
      result.current.handleChange('password', 'Password1!');
      result.current.handleChange('phoneNumber', '1234567890');
      result.current.handleChange('age', '30');
      result.current.handleChange('country', 'JO');
      result.current.handleChange('agreeToTerms', true);
    });

    expect(result.current.isFormValid).toBe(true);
  });

  it('prevents form submission with invalid fields', () => {
    const { result } = renderHook(() => useDynamicForm());
    const mockPreventDefault = jest.fn();
    const mockEvent = { preventDefault: mockPreventDefault } as unknown as React.FormEvent;
    
    const consoleSpy = jest.spyOn(console, 'log');
    
    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Form has errors');
    
    consoleSpy.mockRestore();
  });
});