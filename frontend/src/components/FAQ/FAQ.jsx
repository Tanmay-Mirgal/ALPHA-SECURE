import React, { useState } from 'react';
import { Button } from '../ui/button';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = ['General', 'Support', 'Hosting', 'Product'];

  return (
    <div className="mt-16 bg-gray-900 text-white py-16 px-6">
      {/* Title */}
      <h1 className="text-5xl font-bold text-center">Frequently Asked Questions</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-8">
        {tabs.map((tab) => (
          <Button
            key={tab}
            className={`px-6 py-2 rounded-full text-lg transition-all ${
              activeTab === tab ? 'bg-gray-700 white' : 'bg-white text-black hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        {/* FAQ Item */}
        <details className="p-4 border-b border-gray-700">
          <summary className="text-lg font-semibold cursor-pointer hover:text-gray-400">
            01 How does it work?
          </summary>
          <p className="mt-2 text-gray-400">
            Our website provides alternative data insights to help you make better investment decisions.
          </p>
        </details>

        <details className="p-4 border-b border-gray-700">
          <summary className="text-lg font-semibold cursor-pointer hover:text-gray-400">
            02 How can I set up a new website?
          </summary>
          <p className="mt-2 text-gray-400">
            Our platform offers a range of tools and templates to help you quickly launch a professional website.
          </p>
        </details>

        <details className="p-4 border-b border-gray-700">
          <summary className="text-lg font-semibold cursor-pointer hover:text-gray-400">
            03 What payment methods do you accept?
          </summary>
          <p className="mt-2 text-gray-400">
            We accept major credit cards, PayPal, and cryptocurrency for seamless transactions.
          </p>
        </details>

        <details className="p-4 border-b border-gray-700">
          <summary className="text-lg font-semibold cursor-pointer hover:text-gray-400">
            04 Can I cancel my subscription anytime?
          </summary>
          <p className="mt-2 text-gray-400">
            Yes, you can cancel your subscription at any time through your account settings.
          </p>
        </details>
      </div>
    </div>
  );
};

export default FAQ;