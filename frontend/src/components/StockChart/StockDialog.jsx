import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import ZigzagStockChart from './StockChart';



const StockDialog = ({
  isOpen,
  onOpenChange,
  stock,
  onBuy,
  onSell,
  portfolio,
}) => {
  if (!stock) return null;

  const isGainer = stock.adj_close > stock.adj_open;
  const percentageChange = ((stock.adj_close - stock.adj_open) / stock.adj_open) * 100;
  const sharesOwned = portfolio[stock.symbol] || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-800">
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

        <div className="h-[300px] mb-6">
          <ZigzagStockChart 
            data={[
              { time: '9:30', value: stock.adj_open },
              { time: '16:00', value: stock.adj_close }
            ]} 
            color={isGainer ? '#22c55e' : '#ef4444'} 
          />
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