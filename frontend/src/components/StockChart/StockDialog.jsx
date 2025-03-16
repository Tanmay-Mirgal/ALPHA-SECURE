import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

// Dummy data generator function with specific price ranges
const generateDummyData = (stock, days = 30) => {
  if (!stock || typeof stock.adj_close !== 'number') {
    return [];
  }

  const priceRanges = [62, 75, 50, 84]; // Specific price points to use
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Use price ranges to generate more realistic movements
    const baseIndex = Math.floor(i / (days / priceRanges.length));
    const currentBase = priceRanges[baseIndex];
    const nextBase = priceRanges[(baseIndex + 1) % priceRanges.length];
    
    // Calculate price movement between base prices
    const progress = (i % (days / priceRanges.length)) / (days / priceRanges.length);
    const basePrice = currentBase + (nextBase - currentBase) * progress;
    
    // Add some daily volatility
    const volatility = 0.015; // 1.5% daily volatility
    const randomChange = (Math.random() - 0.5) * volatility * basePrice;
    
    const adj_open = basePrice + randomChange;
    const adj_close = adj_open + (Math.random() - 0.5) * volatility * basePrice;
    const adj_high = Math.max(adj_open, adj_close) + Math.random() * volatility * basePrice;
    const adj_low = Math.min(adj_open, adj_close) - Math.random() * volatility * basePrice;
    
    data.push({
      date: date.toISOString(),
      symbol: stock.symbol || "AAPL",
      __v: 0,
      adj_close: Number(adj_close.toFixed(2)),
      adj_high: Number(adj_high.toFixed(2)),
      adj_low: Number(adj_low.toFixed(2)),
      adj_open: Number(adj_open.toFixed(2)),
      adj_volume: Math.floor(Math.random() * 8000000) + 1000000,
      close: Number(adj_close.toFixed(2)),
      dividend: stock.dividend || 0.22,
      exchange: stock.exchange || "NASDAQ",
      high: Number(adj_high.toFixed(2)),
      low: Number(adj_low.toFixed(2)),
      open: Number(adj_open.toFixed(2)),
      split_factor: stock.split_factor || 1,
      volume: Math.floor(Math.random() * 8000000) + 1000000
    });
  }
  
  return data;
};

const StockDialog = ({
  isOpen,
  onOpenChange,
  stock,
  onBuy,
  onSell,
  portfolio,
  historicalData
}) => {
  if (!stock) return null;

  const isGainer = stock.adj_close > stock.adj_open;
  const percentageChange = ((stock.adj_close - stock.adj_open) / stock.adj_open) * 100;
  const sharesOwned = portfolio[stock.symbol] || 0;

  // Generate dummy data based on the current stock data if no historical data


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{stock.symbol}</span>
              <span className="text-gray-400">({stock.exchange})</span>
            </div>
            {isGainer ? (
              <TrendingUp className="h-6 w-6 text-green-500" />
            ) : (
              <TrendingDown className="h-6 w-6 text-red-500" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          {/* <StockChart 
            data={chartData}
            color={isGainer ? '#22c55e' : '#ef4444'} 
          /> */}
          {!historicalData?.length && (
            <p className="text-sm text-gray-400 text-center mt-2">
              Showing simulated historical data
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
            <div>
              <p className="text-sm text-gray-400">Current Price</p>
              <p className="text-2xl font-bold">${stock.adj_close.toFixed(2)}</p>
            </div>
            <span className={`text-lg font-semibold ${isGainer ? 'text-green-500' : 'text-red-500'}`}>
              {isGainer ? '+' : ''}{percentageChange.toFixed(2)}%
            </span>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Your Position</p>
            <p className="text-lg">
              <span className="font-bold">{sharesOwned}</span> shares owned
            </p>
            <p className="text-gray-400">
              Value: ${(sharesOwned * stock.adj_close).toFixed(2)}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBuy}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              <DollarSign className="h-5 w-5" />
              Buy
            </button>
            <button
              onClick={onSell}
              disabled={sharesOwned === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              <DollarSign className="h-5 w-5" />
              Sell
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockDialog;