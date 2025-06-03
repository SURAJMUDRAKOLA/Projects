import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, LogOut, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <UtensilsCrossed className="h-8 w-8 text-orange-600" />
          <span className="text-xl font-bold text-gray-900">FoodieDelight</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-medium transition-colors hover:text-orange-600 ${
                location.pathname === link.path ? 'text-orange-600' : 'text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-600 transition-colors" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors">
                <User className="h-6 w-6" />
                <span className="font-medium">{user.name.split(' ')[0]}</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Orders
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium ${
                    location.pathname === link.path ? 'text-orange-600' : 'text-gray-700'
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link to="/profile" className="text-gray-700" onClick={closeMenu}>
                    Profile
                  </Link>
                  <Link to="/orders" className="text-gray-700" onClick={closeMenu}>
                    Orders
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="primary" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;