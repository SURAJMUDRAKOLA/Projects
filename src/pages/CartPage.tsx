import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/menu">
            <Button>
              <ArrowLeft size={16} className="mr-2" />
              Browse Menu
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
              <button 
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
            
            <AnimatePresence>
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 sticky top-24"
          >
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">$3.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-xl">
                  ${(totalPrice + 3.99 + totalPrice * 0.08).toFixed(2)}
                </span>
              </div>
            </div>
            
            {user ? (
              <Button fullWidth size="lg">
                Proceed to Checkout
              </Button>
            ) : (
              <div className="space-y-4">
                <Link to="/login">
                  <Button fullWidth>
                    Login to Checkout
                  </Button>
                </Link>
                <p className="text-sm text-gray-600 text-center">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-orange-600 hover:text-orange-700">
                    Sign up
                  </Link>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;