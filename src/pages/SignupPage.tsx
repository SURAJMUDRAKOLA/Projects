import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              fullWidth
            />
            
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              fullWidth
            />
            
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              fullWidth
            />
            
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              fullWidth
            />
          </div>
          
          <div>
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupPage;