import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User } from 'lucide-react';
import { loginAdmin, registerAdmin } from '../../services/adminAuth';
import { testSupabaseConnection } from '../../services/testConnection';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function checkConnection() {
      const result = await testSupabaseConnection();
      if (!result.success) {
        setError('Database connection error: ' + result.error);
      }
    }
    checkConnection();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (isRegistering && !name) {
      setError('Name is required');
      return;
    }

    try {
      const authFunction = isRegistering 
        ? () => registerAdmin(email, password, name)
        : () => loginAdmin(email, password);
        
      const { user, error: authError } = await authFunction();
      
      if (authError) {
        if (authError.message.includes('already exists')) {
          setError('An account with this email already exists. Please sign in instead.');
          setIsRegistering(false);
          return;
        }
        throw authError;
      }
      
      if (user) {
        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
    }
  }, [email, password, name, isRegistering, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">
            {isRegistering ? 'Create an admin account' : 'Access the CleanConnect dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {isRegistering && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  placeholder="Your name"
                  required={isRegistering}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
          
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full text-gray-600 py-2 hover:text-gray-900 transition-colors"
          >
            {isRegistering 
              ? 'Already have an account? Sign in' 
              : 'Need an account? Register'}
          </button>
        </form>
      </div>
    </div>
  );
}