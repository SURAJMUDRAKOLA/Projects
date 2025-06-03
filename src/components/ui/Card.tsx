import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hover = true
}) => {
  const hoverAnimation = hover ? {
    whileHover: { y: -5, transition: { duration: 0.2 } },
    whileTap: { y: 0 }
  } : {};
  
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      {...hoverAnimation}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;