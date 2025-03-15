import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const StockerDashboard = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <div className="flex items-center">
          <div className="bg-green-500 rounded-full p-1 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1 className="text-xl font-bold">Stocker</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-sm font-medium">PRODUCTS</a>
          <a href="#" className="text-sm font-medium">PRICING</a>
          <a href="#" className="text-sm font-medium">COMPANY</a>
          <a href="#" className="text-sm font-medium">FAQ'S</a>
        </nav>
        <Button variant="outline" className="rounded-full">Log In</Button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Make Better Investment Decisions With Alternative Data</h2>
          <p className="text-gray-600 mb-6">Get the inside scoop on companies like never before.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-white rounded-full p-2 shadow-sm mr-4">
              <img src="/api/placeholder/32/32" alt="Spotify logo" className="w-8 h-8 rounded-full" />
              <span className="ml-2 font-medium">SPOT (Spotify)</span>
            </div>
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+0.90%</div>
          </div>
          
          <Tabs defaultValue="1w">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="12h">12H</TabsTrigger>
              <TabsTrigger value="1d">1D</TabsTrigger>
              <TabsTrigger value="1w">1W</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
            </TabsList>
            <TabsContent value="1w" className="pt-2">
              <div className="h-48 relative">
                <div className="border-t border-dashed border-gray-300 absolute top-1/2 w-full"></div>
                <div className="absolute top-1/2 right-1/2 bg-green-50 px-2 py-1 rounded text-green-800 text-sm">
                  $244.21
                </div>
                {/* Placeholder for chart */}
                <div className="h-full flex items-center justify-center">
                  <img src="/api/placeholder/320/160" alt="Stock chart" className="w-full h-40 object-cover" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 bg-white rounded-lg shadow-sm p-4 inline-block">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full mr-2 flex items-center justify-center text-white font-bold">f</div>
              <div>
                <div className="font-semibold">FB</div>
                <div className="text-xs text-gray-500">Facebook, Inc.</div>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-bold">$365</div>
              <div className="flex items-center">
                <span className="text-sm mr-2">+5</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">+0.23%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-900 text-white px-6 py-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="mr-2 bg-gray-800 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <span className="text-xs">A</span>
            </div>
            <div>
              <div className="font-medium">Amazon (AMZN)</div>
              <div className="flex items-center">
                <span className="mr-2">10,000</span>
                <span className="text-green-400">+10%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 bg-blue-600 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <span className="text-xs">F</span>
            </div>
            <div>
              <div className="font-medium">Ford (F)</div>
              <div className="flex items-center">
                <span className="mr-2">4,531</span>
                <span className="text-green-400">+4.6%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 bg-red-600 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <span className="text-xs">B</span>
            </div>
            <div>
              <div className="font-medium">Bank of America (BAC)</div>
              <div className="flex items-center">
                <span className="mr-2">5,466</span>
                <span className="text-green-400">+12.2%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 bg-blue-500 rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <span className="text-xs">M</span>
            </div>
            <div>
              <div className="font-medium">Microsoft (MSFT)</div>
              <div className="flex items-center">
                <span className="mr-2">151</span>
                <span className="text-green-400">+6.7%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Stocks Section */}
      <section className="py-12 px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Stocks</CardTitle>
                <a href="#" className="text-sm text-green-600">View all</a>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-400 rounded-full mr-3 flex items-center justify-center text-white">
                        <span>t</span>
                      </div>
                      <div>
                        <div className="font-medium">TWTR</div>
                        <div className="text-xs text-gray-500">Twitter Inc.</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$63.98</div>
                      <div className="text-red-500 text-sm">+0.21%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white border rounded-full mr-3 flex items-center justify-center">
                        <span>G</span>
                      </div>
                      <div>
                        <div className="font-medium">GOOGL</div>
                        <div className="text-xs text-gray-500">Alphabet Inc.</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$2.84k</div>
                      <div className="text-green-500 text-sm">+0.88%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white">
                        <span>M</span>
                      </div>
                      <div>
                        <div className="font-medium">MSFT</div>
                        <div className="text-xs text-gray-500">Microsoft</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$302.1</div>
                      <div className="text-red-500 text-sm">+0.22%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white border rounded-full mr-3 flex items-center justify-center">
                        <span>N</span>
                      </div>
                      <div>
                        <div className="font-medium">NIKE</div>
                        <div className="text-xs text-gray-500">Nike, Inc.</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$149.8</div>
                      <div className="text-red-500 text-sm">+0.98%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4">What Stocks are Trending?</h2>
            <p className="text-gray-600 mb-6">
              Find investment opportunities and stock picks using our proprietary alternative data sets including website traffic, customer satisfaction ratings, app downloads, social media followers, and other critical indicators.
            </p>
            <div className="relative">
              <img src="/api/placeholder/400/200" alt="Trend analysis" className="w-full h-48 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Tracking Section */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Track your portfolio</h2>
            <p className="text-gray-600 mb-6">
              By tracking and comparing this data over time, as well as benchmarking it against industry peers, we are able to make informed investment decisions and identify opportunities for our clients.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button className="bg-green-500 hover:bg-green-600 rounded-md py-6">Buy</Button>
              <Button className="bg-red-500 hover:bg-red-600 rounded-md py-6">Sell</Button>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4">Free Stock Alerts for Your Portfolio</h2>
            <p className="text-gray-600 mb-6">
              Stay informed of any developments related to companies in your portfolio. By signing up with us, you can receive timely notifications whenever a company experiences a surge in popularity.
            </p>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-6">
                  <div>
                    <div className="text-sm text-gray-500">Today Gains</div>
                    <div className="font-bold text-lg">$2202 <span className="text-green-500 text-sm">↑</span></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Overall Loss</div>
                    <div className="font-bold text-lg">$5200 <span className="text-red-500 text-sm">↓</span></div>
                  </div>
                </div>
                
                <div className="h-32 relative">
                  <div className="absolute bottom-0 w-full flex items-end justify-between h-24">
                    <div className="w-8 h-8 bg-green-200 rounded-t"></div>
                    <div className="w-8 h-16 bg-green-200 rounded-t"></div>
                    <div className="w-8 h-24 bg-green-500 rounded-t"></div>
                    <div className="w-8 h-16 bg-green-200 rounded-t"></div>
                    <div className="w-8 h-8 bg-green-200 rounded-t"></div>
                    <div className="w-8 h-12 bg-green-200 rounded-t"></div>
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-50 px-2 py-1 rounded text-green-800 text-xs">
                    $74,302
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StockerDashboard;