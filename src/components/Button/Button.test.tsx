import { render , screen , fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Button from "./Button";

describe('Button Component', () => {
    test('renders button with children', () => { //the children prop is the (content) of the button or icon 
      render(<Button>Click Me</Button>); 
  
      // Check if the button is rendered with the correct text
      const buttonElement = screen.getByText(/Click Me/i);
      expect(buttonElement).toBeInTheDocument();
    });
  
    test('calls onClick handler when clicked', () => {
      const handleClick = jest.fn(); // Create a mock function for the (onClick handler)
      render(<Button onClick={handleClick}>Click Me</Button>);
  
      // Simulate a click on the button
      const buttonElement = screen.getByText(/Click Me/i);
      fireEvent.click(buttonElement);
  
      // Check if the onClick handler was called
      expect(handleClick).toHaveBeenCalledTimes(1); // Check if the mock function was called once
    });
  
    test('renders button with custom type', () => {
      render(<Button type="submit">Submit</Button>);
  
      // Check if the button has the correct type
      const buttonElement = screen.getByText(/Submit/i);
      expect(buttonElement).toHaveAttribute('type', 'submit'); // Check if the button has the correct type
    });
  });
