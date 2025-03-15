import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '../../components/ui/input-otp';

const TwoFactorPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleVerify = () => {
    setIsLoading(true);
    // Simulate verification process
    setTimeout(() => setIsLoading(false), 1500);
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-950 text-gray-200">
      <Card className="w-full max-w-xl bg-gray-900 border-gray-800 shadow-xl">
        <div className="grid md:grid-cols-2 gap-4">
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-6">
            <div className="space-y-2 w-full">
              <h1 className="text-2xl font-bold text-white text-center">Two-Factor Authentication</h1>
              <p className="text-center text-sm text-gray-400">Enter the 6-digit code sent to your email</p>
            </div>
            
            <InputOTP maxLength={6} className="gap-2">
              <InputOTPGroup>
                <InputOTPSlot index={0} className="bg-gray-800 border-gray-700 text-white" />
                <InputOTPSlot index={1} className="bg-gray-800 border-gray-700 text-white" />
                <InputOTPSlot index={2} className="bg-gray-800 border-gray-700 text-white" />
              </InputOTPGroup>
              <InputOTPSeparator className="text-gray-600">-</InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={3} className="bg-gray-800 border-gray-700 text-white" />
                <InputOTPSlot index={4} className="bg-gray-800 border-gray-700 text-white" />
                <InputOTPSlot index={5} className="bg-gray-800 border-gray-700 text-white" />
              </InputOTPGroup>
            </InputOTP>
            
            <div className="w-full space-y-4">
              <button 
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
              
              <button className="w-full text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                Didn't receive a code? Resend
              </button>
            </div>
          </CardContent>
          
          <CardContent className="hidden md:flex items-center justify-center p-1 bg-gray-800 rounded-r-lg">
            <img 
              src="https://img.freepik.com/free-vector/verified-concept-illustration_114360-4998.jpg" 
              alt="Two-factor authentication illustration" 
              className="w-full max-w-xl h-full object-cover"
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default TwoFactorPage;