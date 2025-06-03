import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, UtensilsCrossed } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <UtensilsCrossed className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">FoodieDelight</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Delicious food delivered to your doorstep. Order now and experience the best flavors in town.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-white transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-orange-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">123 Food Street, Tasty City, TC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-orange-500 flex-shrink-0" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-orange-500 flex-shrink-0" />
                <span className="text-gray-400">info@foodiedelight.com</span>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-gray-400">8:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span className="text-gray-400">9:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-gray-400">10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FoodieDelight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;