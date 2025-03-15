import React from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Eye, Mail, Lock, User } from 'lucide-react';

const ModernLoginPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 to-gray-900">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full lg:w-1/2 relative">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl"></div>
        
        <div className="mb-12 relative z-10">
          <div className="flex items-center mb-8">
         
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Welcome</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <div className="relative group">
              <Input 
                type="text" 
                id="firstName" 
                placeholder="First Name" 
                className="w-full pl-12 pr-4 py-6 bg-gray-800/50 backdrop-blur-sm border-0 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-amber-500 transition-colors duration-300">
                <User size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <div className="relative group">
              <Input 
                type="text" 
                id="lastName" 
                placeholder="Last Name" 
                className="w-full pl-12 pr-4 py-6 bg-gray-800/50 backdrop-blur-sm border-0 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-amber-500 transition-colors duration-300">
                <User size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative group">
              <Input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                className="w-full pl-12 pr-4 py-6 bg-gray-800/50 backdrop-blur-sm border-0 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-amber-500 transition-colors duration-300">
                <Mail size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative group">
              <Input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                className="w-full pl-12 pr-12 py-6 bg-gray-800/50 backdrop-blur-sm border-0 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-amber-500 transition-colors duration-300">
                <Lock size={18} />
              </div>
              <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-amber-500 transition-colors duration-300">
                <Eye size={18} />
              </button>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-amber-500 hover:text-amber-400 transition-colors">Forgot password?</a>
            </div>
          </div>

          <Button className="w-full py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold rounded-xl shadow-lg shadow-amber-900/20 transition-all duration-300 mt-4">
            Sign in
          </Button>

         

          

          <div className="text-center text-gray-400 text-sm mt-8">
             Have an account?{' '}
            <a href="/login" className="text-amber-500 hover:text-amber-400 font-medium transition-colors">Login here</a>
          </div>
        </div>
      </div>

      {/* Right Side - Welcome Section with Modern Grid */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gray-900/80 p-12 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 grid grid-cols-3 gap-5 mb-16">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${
                i % 3 === 0 ? 'from-gray-800/90 to-gray-700/80' : 
                i % 3 === 1 ? 'from-gray-800/80 to-gray-700/70' : 
                'from-gray-800/70 to-gray-700/60'
              } backdrop-blur-sm border border-gray-700/30 shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-amber-900/20`}
            >
              {i === 4 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-500">✓</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center relative z-10">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to ASTRA</h2>
          <p className="text-gray-400 max-w-md leading-relaxed">
            Sign in to continue your conversations and catch up with your messages in our beautifully designed interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernLoginPage;