import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area } from "recharts";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { TrendingUp, TrendingDown, Activity, ArrowUp, ArrowDown } from "lucide-react";

const StockPredictor = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Color theme constants
  const colors = {
    positive: "#4CAF50",
    negative: "#F44336",
    neutral: "#FFEB3B",
    
    bgPrimary: "#0a0f1a",
    bgSecondary: "#1a2234",
    bgTertiary: "#2a3346",
    
    headerGradient: "linear-gradient(90deg, #1e3a8a 0%, #5b21b6 100%)",
    cardGradient: {
      green: "linear-gradient(135deg, #1e3a20 0%, #2a5134 100%)",
      blue: "linear-gradient(135deg, #1e3a5a 0%, #2a4574 100%)",
      purple: "linear-gradient(135deg, #3a1e5a 0%, #4a2a74 100%)",
      dark: "linear-gradient(135deg, #1a2234 0%, #2a3346 100%)"
    },
    
    text: {
      primary: "#ffffff",
      secondary: "#adb5bd",
      accent: "#64b5f6"
    },
    
    border: {
      primary: "#2a3346",
      accent: "#3b82f6"
    }
  };

  useEffect(() => {
    setCompanies([
      "ADANIENT", "ADANIPORTS", "INDUSINDBK", "TATACONSUM", "BRITANNIA", "M&M", "POWERGRID", "ASIANPAINT", "SBIN", 
      "MARUTI", "HCLTECH", "TITAN", "NESTLEIND", "COALINDIA", "SBILIFE", "ULTRACEMCO", "GRASIM", "HEROMOTOCO", 
      "ICICIBANK", "KOTAKBANK", "NTPC", "RELIANCE", "WIPRO", "TATASTEEL", "BAJAJFINSV", "HDFCLIFE", "JSWSTEEL", 
      "HINDALCO", "LT", "BAJFINANCE", "INFY", "SUNPHARMA", "AXISBANK", "ONGC", "HDFCBANK", "TCS", "CIPLA", 
      "DRREDDY", "BPCL", "TATAMOTORS", "ITC", "BHARTIARTL", "TECHM", "HINDUNILVR", "DIVISLAB", "UPL", "EICHERMOT", 
      "LTIM", "BAJAJ-AUTO", "APOLLOHOSP"
    ]);
  }, []);

  const fetchPrediction = async (stockName) => {
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch(`http://127.0.0.1:5000/predict?stock_name=${stockName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data. Server error.");
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPrediction(data);
        setSelectedStock(stockName);
        setIsOpen(true);
      }
    } catch (err) {
      setError("Failed to fetch data. Make sure the backend is running.");
    }
  };

  const chartData = prediction
    ? [
        { name: "Predicted Price", value: prediction["Predicted Price"] },
        { name: "Recommended Sell Price", value: prediction["Recommended Sell Price"] },
        { name: "Total Stocks Remaining", value: prediction["Total Stocks Remaining"] },
      ]
    : [];

  // Filter companies based on search term
  const filteredCompanies = companies.filter(company => 
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen" style={{ background: colors.bgPrimary }}>
      {/* Header section */}
      <div className="p-6 rounded-b-3xl shadow-lg" style={{ background: colors.headerGradient }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Want to Predict the Stock ?</h1>
          <p className="text-gray-200">AI Predictive analytics for smarter trading decisions. </p>
          
          {/* Search bar */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ background: 'rgba(26, 34, 52, 0.7)', borderColor: colors.border.primary }}
            />
          </div>
        </div>
      </div>
      
      {/* Market overview cards */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-none" style={{ background: colors.cardGradient.green }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300">NIFTY 50</p>
                <TrendingUp size={20} color={colors.positive} />
              </div>
              <p className="text-2xl font-bold text-white">22,474.75</p>
              <div className="flex items-center mt-1">
                <ArrowUp size={16} color={colors.positive} />
                <p className="ml-1" style={{ color: colors.positive }}>+0.75%</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none" style={{ background: colors.cardGradient.blue }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300">SENSEX</p>
                <TrendingDown size={20} color={colors.negative} />
              </div>
              <p className="text-2xl font-bold text-white">73,890.32</p>
              <div className="flex items-center mt-1">
                <ArrowDown size={16} color={colors.negative} />
                <p className="ml-1" style={{ color: colors.negative }}>-0.21%</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none" style={{ background: colors.cardGradient.purple }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300">Market Mood</p>
                <Activity size={20} color={colors.neutral} />
              </div>
              <p className="text-2xl font-bold text-white">Bullish</p>
              <p style={{ color: colors.neutral }}>Volatility: Medium</p>
            </CardContent>
          </Card>
        </div>

        {/* Stocks grid */}
        <h2 className="text-2xl font-bold mb-4">Stocks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCompanies.map((ticker) => {
            const randomChange = (Math.random() * 8 - 4).toFixed(2);
            const isPositive = parseFloat(randomChange) >= 0;
            const badgeColor = isPositive ? colors.positive : colors.negative;
            const chartColor = isPositive ? colors.positive : colors.negative;
            const price = (Math.random() * 5000 + 1000).toFixed(2);
            
            return (
              <Card 
                key={ticker} 
                className="rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                style={{ 
                  background: colors.bgSecondary, 
                  borderColor: colors.border.primary,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: colors.text.primary
                }}
                onClick={() => fetchPrediction(ticker)}
              >
                <div className="absolute top-0 right-0 p-1.5">
                  <Badge className="text-white" style={{ background: badgeColor }}>
                    {isPositive ? '+' : ''}{randomChange}%
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold">{ticker}</CardTitle>
                  <div className="text-sm mt-2" style={{ color: colors.text.primary }}>
                    <div className="flex justify-between mb-1">
                      <span>Price:</span>
                      <span style={{ color: colors.text.primary }}>₹{price}</span>
                    </div>
                  </div>
                  
                  {/* Mini sparkline chart */}
                  <div className="h-12 mt-2 opacity-70">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={Array(10).fill().map((_, i) => ({
                        name: i,
                        value: Math.random() * 100 + 50
                      }))}>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={chartColor} 
                          fill={`${chartColor}33`} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl p-6 rounded-lg shadow-xl text-white" style={{ background: colors.bgSecondary }}>
          <DialogHeader className="w-full flex justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">{selectedStock} Prediction</DialogTitle>
              <DialogDescription style={{ color: colors.text.secondary }}>AI-powered price analysis</DialogDescription>
            </div>
            {/* <DialogClose asChild>
              <Button variant="ghost" className="text-white">✖</Button>
            </DialogClose> */}
          </DialogHeader>
          
          {prediction && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-3 p-4 rounded-lg" style={{ 
                background: colors.bgTertiary, 
                borderColor: colors.border.primary,
                borderWidth: '1px',
                borderStyle: 'solid'
              }}>
                <p className="text-lg"><strong>Predicted Price:</strong> ₹{prediction["Predicted Price"].toFixed(2)}</p>
                <p className="text-lg"><strong>Recommended Sell Price:</strong> ₹{prediction["Recommended Sell Price"].toFixed(2)}</p>
                <p className="text-lg" style={{ color: colors.positive }}><strong>Total Stocks Remaining:</strong> {prediction["Total Stocks Remaining"]}</p>
                <div className="pt-2 mt-2 border-t" style={{ borderColor: colors.border.primary }}>
                  <p className="text-sm" style={{ color: colors.text.secondary }}>AI Confidence: <span style={{ color: colors.neutral }}>High</span></p>
                  <p className="text-sm" style={{ color: colors.text.secondary }}>Prediction Horizon: 7 days</p>
                </div>
              </div>
              <div className="grid grid-rows-2 gap-4 w-full">
                <div className="rounded-lg p-4" style={{ 
                  background: colors.bgTertiary, 
                  borderColor: colors.border.primary,
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}>
                  <h3 className="text-lg font-semibold">Price Trend</h3>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.border.primary} />
                      <XAxis dataKey="name" stroke={colors.text.secondary} />
                      <YAxis stroke={colors.text.secondary} />
                      <Tooltip contentStyle={{ backgroundColor: colors.bgSecondary, borderColor: colors.border.primary }} />
                      <Line type="monotone" dataKey="value" stroke={colors.positive} strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-lg p-4" style={{ 
                  background: colors.bgTertiary, 
                  borderColor: colors.border.primary,
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}>
                  <h3 className="text-lg font-semibold">Comparison</h3>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.border.primary} />
                      <XAxis dataKey="name" stroke={colors.text.secondary} />
                      <YAxis stroke={colors.text.secondary} />
                      <Tooltip contentStyle={{ backgroundColor: colors.bgSecondary, borderColor: colors.border.primary }} />
                      <Bar dataKey="value" fill={colors.text.accent} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {error && <p className="text-red-500 max-w-6xl mx-auto px-6">{error}</p>}
    </div>
  );
};

export default StockPredictor;