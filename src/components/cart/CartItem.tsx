import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center py-4 border-b border-gray-200"
    >
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            className="px-2 py-1 text-gray-600 hover:text-orange-600"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus size={16} />
          </button>
          <span className="px-2 py-1 text-gray-900 w-8 text-center">{item.quantity}</span>
          <button
            className="px-2 py-1 text-gray-600 hover:text-orange-600"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button
          className="ml-4 text-gray-500 hover:text-red-500"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;