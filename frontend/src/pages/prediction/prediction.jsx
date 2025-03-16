/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,ComposedChart, BarChart, Bar, Legend, AreaChart, Area, ReferenceLine } from "recharts";

import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { TrendingUp, TrendingDown, Activity, ArrowUp, ArrowDown, CreditCard, BadgeAlert, X } from "lucide-react";

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
  <DialogContent className="max-w-4xl p-6 rounded-lg shadow-xl text-white" style={{ background: colors.bgSecondary }}>
    <DialogHeader className="w-full flex justify-between items-center mb-4">
      <div>
        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="text-teal-400" size={24} />
          {selectedStock} Prediction
        </DialogTitle>
        <DialogDescription className="text-base" style={{ color: colors.text.secondary }}>
          AI-powered price analysis with 7-day forecast
        </DialogDescription>
      </div>
      <DialogClose asChild>
        <Button variant="ghost" className="text-white hover:bg-slate-700 rounded-full h-8 w-8 p-0">
          <X size={18} />
        </Button>
      </DialogClose>
    </DialogHeader>
    
    {prediction && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="space-y-4 p-5 rounded-lg" style={{ 
          background: colors.bgTertiary, 
          borderColor: colors.border.primary,
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Prediction Summary</h3>
            <Badge style={{ background: colors.primary }}>High Confidence</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3">
          
            <div>
              <p className="text-sm" style={{ color: colors.text.secondary }}>Predicted Price</p>
              <p className="text-xl font-bold" style={{ color: colors.neutral }}>₹{prediction["Predicted Price"].toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: colors.text.secondary }}>Recommended Sell</p>
              <p className="text-xl font-bold" style={{ color: colors.positive }}>₹{prediction["Recommended Sell Price"].toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: colors.text.secondary }}>Potential Profit</p>
              <p className="text-xl font-bold" style={{ color: colors.positive }}>
                ₹{(prediction["Recommended Sell Price"] - prediction["Predicted Price"]).toFixed(2)}
                <span className="text-sm ml-1">
                  ({(((prediction["Recommended Sell Price"] - prediction["Predicted Price"]) / prediction["Predicted Price"]) * 100).toFixed(1)}%)
                </span>
              </p>
            </div>
          </div>
          
        
        </div>
        
        <div className="grid grid-rows-2 gap-4 w-full">
          <div className="rounded-lg p-4" style={{ 
            background: colors.bgTertiary, 
            borderColor: colors.border.primary,
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Price Trend</h3>
              <div className="flex items-center text-xs gap-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-1" style={{ background: colors.positive }}></div>
                  <span style={{ color: colors.text.secondary }}>Historical</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-1" style={{ background: colors.neutral }}></div>
                  <span style={{ color: colors.text.secondary }}>Predicted</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.positive} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.positive} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.neutral} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.neutral} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border.primary} />
                <XAxis dataKey="name" stroke={colors.text.secondary} tick={{ fontSize: 10 }} />
                <YAxis stroke={colors.text.secondary} tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.bgSecondary, 
                    borderColor: colors.border.primary,
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }} 
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <ReferenceLine 
                  y={prediction["Recommended Sell Price"]} 
                  label={{ value: 'Sell Target', position: 'insideTopRight', fill: colors.positive, fontSize: 10 }}
                  stroke={colors.positive} 
                  strokeDasharray="3 3" 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={colors.positive} 
                  fillOpacity={1}
                  fill="url(#colorHistorical)"
                  strokeWidth={2}
                  dot={{ fill: colors.positive, r: 3 }}
                  activeDot={{ r: 5, stroke: colors.bgSecondary, strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="Predicted Price" 
                  stroke={colors.neutral} 
                  fillOpacity={1}
                  fill="url(#colorPredicted)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: colors.neutral, r: 3 }}
                  activeDot={{ r: 5, stroke: colors.bgSecondary, strokeWidth: 1 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="rounded-lg p-4" style={{ 
            background: colors.bgTertiary, 
            borderColor: colors.border.primary,
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 className="text-lg font-semibold mb-2">Market Comparison</h3>
            <ResponsiveContainer width="100%" height={150}>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border.primary} />
                <XAxis dataKey="name" stroke={colors.text.secondary} tick={{ fontSize: 10 }} />
                <YAxis yAxisId="left" orientation="left" stroke={colors.text.secondary} tick={{ fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" stroke={colors.text.accent} tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.bgSecondary, 
                    borderColor: colors.border.primary,
                    borderRadius: '4px', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  wrapperStyle={{ fontSize: 10, color: colors.text.secondary }}
                />
                <Bar 
                  yAxisId="left" 
                  dataKey="volume" 
                  name="Volume" 
                  fill={colors.text.accent} 
                  fillOpacity={0.6}
                  radius={[2, 2, 0, 0]}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="value" 
                  name={selectedStock}
                  stroke={colors.positive} 
                  strokeWidth={2}
                  dot={{ fill: colors.positive, r: 3 }}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="marketAvg" 
                  name="Market Avg" 
                  stroke={colors.text.secondary} 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={{ fill: colors.text.secondary, r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )}
    
    <div className="mt-4 text-xs text-center" style={{ color: colors.text.secondary }}>
      Analysis updated {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • 
      Data sources: NSE, BSE & proprietary AI models
    </div>
  </DialogContent>
</Dialog>

      {error && <p className="text-red-500 max-w-6xl mx-auto px-6">{error}</p>}
    </div>
  );
};

export default StockPredictor;