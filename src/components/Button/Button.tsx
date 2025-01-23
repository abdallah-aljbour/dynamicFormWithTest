import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'; // Type of the button (default is 'button')
  onClick?: () => void; // Optional: Click handler
  children: React.ReactNode; // Content of the button (e.g., text or icons)
}

const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, children }) => { //children is the content of the button
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;