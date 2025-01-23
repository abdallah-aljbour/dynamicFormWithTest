// import '@testing-library/jest-dom'; // For custom matchers (liske gitByText, toBeInTheDocument)
// import { render, screen, fireEvent } from '@testing-library/react'; // For rendering the component and querying the virtule DOM
// import InputField from './InputField';

// describe('InputField Component', () => { //describe is a function that groups related tests
//   test('renders input field with label and placeholder', () => {
//     render(
//       <InputField
//         type="text"
//         name="Full Nme"
//         label="Username"
//         value="" 
//         onChange={() => {}} //onChange is a function that will be called when the input value changes
//         placeholder="Enter your Name"
//       />
//     );

//     // Check if the label is rendered
//     const labelElement = screen.getByText(/Username/i); //getByText is a function that returns the first element that matches the text in the virtual DOM
//     expect(labelElement).toBeInTheDocument(); //toBeInTheDocument is a custom (matcher) that checks if the element is in the (virtual DOM)

//     // Check if the input field is rendered with the correct placeholder
//     const inputElement = screen.getByPlaceholderText(/Enter your Name/i); //getByPlaceholderText is a function that returns the first element that matches the placeholder text in the virtual DOM
//     expect(inputElement).toBeInTheDocument();
//   });

//   test('updates input field value on change', () => { //test is a function that defines a test case
//     let inputValue = '';
//     const handleChange = (value: string) => {
//       inputValue = value;
//     };

//     render( //render is a function that renders the component in the virtual DOM
//       <InputField
//         type="text"
//         name="username"
//         label="Username"
//         value={inputValue}
//         onChange={handleChange}
//         placeholder="Enter your username"
//       />
//     );

//     // Simulate typing in the input field
//     const inputElement = screen.getByPlaceholderText(/Enter your username/i);
//     fireEvent.change(inputElement, { target: { value: 'john_doe' } }); //fireEvent.change is a function that simulates a change event on the input field

//     // Check if the input value is updated
//     expect(inputValue).toBe('john_doe'); //toBe is a custom matcher that checks if the value is equal to 'john_doe'
//   });

//   test('renders required input field', () => {
//     render(
//       <InputField
//         type="text"
//         name="username"
//         label="Username"
//         value=""
//         onChange={() => {}}
//         placeholder="Enter your username"
//         required
//       />
//     );

//     // Check if the input field is required
//     const inputElement = screen.getByPlaceholderText(/Enter your username/i);
//     expect(inputElement).toBeRequired(); //toBeRequired is a custom matcher that checks if the input field is required
//   });
// });
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