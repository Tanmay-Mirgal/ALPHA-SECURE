import React from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Eye } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full lg:w-1/2">
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-transparent border border-amber-600/80">
              <span className="text-amber-500">▣</span>
            </div>
          </div>
          <h1 className="text-2xl font-medium text-amber-500/90 mb-1">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-amber-500/90">
              Email
            </label>
            <div className="relative">
              <Input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                className="w-full px-4 py-6 bg-gray-900/60 border border-gray-800/50 rounded-md text-gray-400 focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-amber-500/90">
              Password
            </label>
            <div className="relative">
              <Input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-6 bg-gray-900/60 border border-gray-800/50 rounded-md text-gray-400 focus:outline-none pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                <Eye size={20} />
              </button>
            </div>
          </div>

          <Button className="w-full py-6 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-md font-medium transition-colors">
            Sign in
          </Button>

          <div className="text-center text-gray-500 text-sm mt-4">
            Don't have an account?{' '}
            <a href="#" className="text-amber-500 hover:underline">Create account</a>
          </div>
        </div>
      </div>

      {/* Right Side - Welcome Section with Grid */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gray-900/30 p-12">
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