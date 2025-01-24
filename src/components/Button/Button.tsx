;import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  type = 'button', 
  onClick, 
  children, 
  disabled = false,
  className = ''
}) => {
  const buttonClasses = `
    ${styles.button} 
    ${disabled ? styles['button--disabled'] : ''} 
    ${className}
  `.trim();

  return (
    <button 
      type={type} 
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;