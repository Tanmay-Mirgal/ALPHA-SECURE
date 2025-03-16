import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const { signup, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate()
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/")
      toast.success("Account created successfully! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 to-gray-900">
      {/* Left Side - Signup Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full lg:w-1/2 relative">
        {/* Background Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl"></div>

        <div className="mb-12 relative z-10">
          <h1 className="text-3xl font-bold text-white mb-3">Create Account</h1>
          <p className="text-gray-400">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* First Name */}
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <div className="relative group">
              <Input 
                type="text" 
                id="firstName" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name" 
                className="w-full pl-12 pr-4 py-6 bg-gray-800/50 backdrop-blur-sm border-0 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 transition-colors duration-300">
                <User size={18} />
              </div>
            </div>
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <div className="relative group">
              <Input 
                type="text" 
                id="lastName" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name" 
                className="w-full pl-12 pr-4 py-6 bg-gray-800/50 backdrop-blur-sm border-0 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 transition-colors duration-300">
                <User size={18} />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative group">
              <Input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com" 
                className="w-full pl-12 pr-4 py-6 bg-gray-800/50 backdrop-blur-sm border-0 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 transition-colors duration-300">
                <Mail size={18} />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative group">
              <Input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full pl-12 pr-12 py-6 bg-gray-800/50 backdrop-blur-sm border-0 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 transition-colors duration-300">
                <Lock size={18} />
              </div>
              {/* Toggle Password Visibility */}
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-amber-500 transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold rounded-xl shadow-lg transition-all duration-300 mt-4"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>

          <div className="text-center text-gray-400 text-sm mt-8">
            Already have an account?{' '}
            <a href="/login" className="text-amber-500 hover:text-amber-400 font-medium transition-colors">Login here</a>
          </div>
        </form>
      </div>

      {/* Right Side - Welcome Section */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gray-900/80 p-12 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="text-center relative z-10">
          <h2 className="text-2xl font-bold text-white mb-4">Join ASTRA Today</h2>
          <p className="text-gray-400 max-w-md leading-relaxed">
            Sign up and explore a seamless user experience in our beautifully designed interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
