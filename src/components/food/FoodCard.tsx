import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import Card from '../ui/Card';

interface FoodCardProps {
  item: MenuItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="h-full flex flex-col">
      <div className="relative overflow-hidden h-48">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {item.popular && (
          <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
            Popular
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3 flex-grow">{item.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold">₹{item.price.toFixed(2)}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-orange-600 text-white p-2 rounded-full"
            onClick={() => addToCart(item)}
          >
            <Plus size={18} />
          </motion.button>
        </div>
      </div>
    </Card>
  );
};

export default FoodCard;