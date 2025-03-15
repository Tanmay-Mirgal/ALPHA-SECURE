import React from 'react';
import { ArrowRight, BarChart3, Globe, Shield, TrendingUp, Users } from 'lucide-react';

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl space-y-6">
              <span className="bg-blue-500 bg-opacity-20 text-blue-400 px-4 py-1 rounded-full font-medium text-sm">Investment Intelligence Platform</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Smarter Investing with <span className="text-blue-400">Alternative Data</span>
              </h1>
              <p className="text-xl text-gray-300">
                Gain the competitive edge in your investment strategy with our AI-powered market insights and alternative data analysis.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
                  Get Started <ArrowRight size={18} />
                </button>
                <button className="border border-gray-600 hover:border-gray-500 text-white font-medium py-3 px-8 rounded-lg transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="bg-gray-800 p-2 rounded-xl shadow-2xl">
                <img src="/download_99.20634920634922.svg" alt="Financial Dashboard" className="rounded-lg w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-400">500+</p>
              <p className="text-gray-400">Data Sources</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-400">98%</p>
              <p className="text-gray-400">Accuracy Rate</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-400">10k+</p>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-400">$2.5B</p>
              <p className="text-gray-400">Managed Assets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Alternative Data Sources</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Go beyond traditional financial metrics with our comprehensive alternative data suite
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-all">
              <div className="bg-blue-500 bg-opacity-10 p-3 rounded-lg inline-block mb-4">
                <Globe className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Web Traffic Analysis</h3>
              <p className="text-gray-400">
                Monitor website traffic patterns for public companies to identify growth trends before they appear in financial statements.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-all">
              <div className="bg-blue-500 bg-opacity-10 p-3 rounded-lg inline-block mb-4">
                <Users className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Social Sentiment</h3>
              <p className="text-gray-400">
                Gauge market sentiment through social media analysis and consumer feedback across multiple platforms.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-all">
              <div className="bg-blue-500 bg-opacity-10 p-3 rounded-lg inline-block mb-4">
                <BarChart3 className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Satellite Imagery</h3>
              <p className="text-gray-400">
                Track retail foot traffic, supply chain activity, and industrial operations using satellite data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-800 text-white py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Our Platform Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A simple, three-step process to transform your investment strategy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Connect Data Sources</h3>
              <p className="text-gray-400">
                Integrate our platform with your existing financial data sources and choose from our alternative data suite.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-400">
                Our algorithms process millions of data points to identify patterns and investment opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
              <p className="text-gray-400">
                Receive customized reports and alerts to make informed investment decisions ahead of the market.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              Start Your Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hear from financial professionals who have transformed their investment strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="flex items-center mb-6">
                <img src="/api/placeholder/80/80" alt="Client" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold text-white">Alex Donovan</h4>
                  <p className="text-gray-400 text-sm">Portfolio Manager, Quantum Funds</p>
                </div>
              </div>
              <p className="text-gray-300">
                "This platform has completely transformed our investment approach. The alternative data insights have helped us identify market movements weeks before they become apparent through traditional analysis."
              </p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-blue-400 text-xl">★</span>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="flex items-center mb-6">
                <img src="/api/placeholder/80/80" alt="Client" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <h4 className="font-semibold text-white">Sophia Chen</h4>
                  <p className="text-gray-400 text-sm">Chief Investment Officer, Meridian Capital</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The satellite imagery analysis alone has proven invaluable for our retail sector investments. We've been able to accurately predict quarterly earnings before they're announced."
              </p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-blue-400 text-xl">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-blue-900 to-gray-900 text-white py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Investment Strategy?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of financial professionals who have already gained the alternative data advantage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold">Trusted by Leading Financial Institutions</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-70">
            {/* Replace with actual logos */}
            <div className="w-32 h-12 bg-gray-800 rounded"></div>
            <div className="w-32 h-12 bg-gray-800 rounded"></div>
            <div className="w-32 h-12 bg-gray-800 rounded"></div>
            <div className="w-32 h-12 bg-gray-800 rounded"></div>
            <div className="w-32 h-12 bg-gray-800 rounded"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;