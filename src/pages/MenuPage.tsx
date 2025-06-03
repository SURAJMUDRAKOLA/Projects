import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { menuItems, categories } from '../data/menu';
import { MenuItem } from '../types';
import FoodCard from '../components/food/FoodCard';
import CategoryCard from '../components/food/CategoryCard';
import Input from '../components/ui/Input';

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  
  useEffect(() => {
    let result = menuItems;
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(item => item.category === categories.find(c => c.id === selectedCategory)?.name);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(result);
  }, [selectedCategory, searchQuery]);
  
  const handleCategoryClick = (id: string) => {
    setSelectedCategory(prev => prev === id ? '' : id);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h1>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative max-w-md mb-6">
          <Input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
              isActive={selectedCategory === category.id}
            />
          ))}
        </div>
      </div>
      
      {/* Menu Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory + searchQuery}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <motion.div key={item.id} variants={itemVariants}>
                <FoodCard item={item} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-xl text-gray-600">No items found. Try a different search or category.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;