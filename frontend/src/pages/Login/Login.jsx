import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // State to track input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
 const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
     navigate("/")
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full lg:w-1/2">
        <div className="mb-10">
          <h1 className="text-2xl font-medium text-white mb-1">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-white">
              Email
            </label>
            <Input 
              type="email" 
              id="email" 
              name="email"
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-4 py-4 bg-gray-900/40 border border-gray-800/40 rounded-md text-gray-300 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-white">
              Password
            </label>
            <div className="relative">
              <Input 
                type={showPassword ? 'text' : 'password'}
                id="password" 
                name="password"
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-4 pr-10 py-4 bg-gray-900/40 border border-gray-800/40 rounded-md text-gray-300 focus:outline-none focus:border-amber-500/50"
              />
              {/* Toggle Password Visibility */}
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-amber-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-md font-medium transition-colors"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-center text-gray-500 text-sm mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-amber-500 hover:text-amber-400">Create account</a>
          </div>
        </form>
      </div>

      {/* Right Side - Welcome Section */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gray-900/20 p-12">
        <div className="grid grid-cols-3 gap-4 mb-16">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-24 h-24 rounded-lg bg-gray-800/70"></div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-medium text-amber-500 mb-2">Welcome back!</h2>
          <p className="text-gray-500 text-sm max-w-md">
            Sign in to continue your conversations and catch up with your messages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
