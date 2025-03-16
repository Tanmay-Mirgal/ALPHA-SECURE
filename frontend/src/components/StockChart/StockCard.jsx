import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StockCard = ({ stock, onClick, onBuy, onSell }) => {
  const isGainer = stock.adj_close > stock.adj_open;
  const percentageChange = ((stock.adj_close - stock.adj_open) / stock.adj_open) * 100;

  return (
    <div
      className="border border-gray-700 bg-gray-800/50 p-6 rounded-xl shadow-lg cursor-pointer hover:bg-gray-800 transition-all duration-200 backdrop-blur-sm"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{stock.symbol}</h2>
          <p className="text-sm text-gray-400">{stock.exchange}</p>
        </div>
        {isGainer ? (
          <TrendingUp className="h-6 w-6 text-green-500" />
        ) : (
          <TrendingDown className="h-6 w-6 text-red-500" />
        )}
      </div>
      
      <div className="flex items-baseline gap-2 mb-4">
        <p className="text-2xl font-semibold text-white">
          ${stock.adj_close.toFixed(2)}
        </p>
        <span className={`text-sm font-medium ${isGainer ? 'text-green-500' : 'text-red-500'}`}>
          {isGainer ? '+' : ''}{percentageChange.toFixed(2)}%
        </span>
      </div>

      <div className="flex gap-2 mt-2">
        <button 
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onBuy && onBuy(stock);
          }}
        >
          Buy
        </button>
        <button 
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onSell && onSell(stock);
          }}
        >
          Sell
        </button>
      </div>
    </div>
  );
};

export default StockCard;