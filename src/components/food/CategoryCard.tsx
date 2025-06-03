import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../types';
import Card from '../ui/Card';

interface CategoryCardProps {
  category: Category;
  onClick: (id: string) => void;
  isActive: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, isActive }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
      onClick={() => onClick(category.id)}
    >
      <Card 
        className={`cursor-pointer transition-all duration-300 ${
          isActive ? 'ring-2 ring-orange-600' : ''
        }`}
        hover={false}
      >
        <div className="relative h-24 overflow-hidden rounded-t-lg">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="p-3 text-center">
          <h3 className="font-medium">{category.name}</h3>
        </div>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;