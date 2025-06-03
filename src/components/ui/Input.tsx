import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${widthClass}`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <motion.div
          initial={{ y: 0 }}
          whileFocus={{ y: -2 }}
          className="relative"
        >
          <input
            ref={ref}
            className={`
              px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 
              focus:border-orange-500 ${widthClass} ${error ? 'border-red-500' : ''} ${className}
            `}
            {...props}
          />
        </motion.div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;