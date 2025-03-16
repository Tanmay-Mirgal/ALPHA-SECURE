import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useStockStore } from "../../store/useStockStore";
import { axiosInstance } from "@/lib/axios";

const loadRazorpay = (callback) => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onload = () => callback();
  document.body.appendChild(script);
};

const StockCard = ({ stock, onClick }) => {
  const priceChange = stock.adj_close - stock.adj_open;
  const priceChangePercent = (priceChange / stock.adj_open) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div
      onClick={() => onClick(stock)}
      className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-all cursor-pointer border border-slate-700 shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{stock.symbol}</h3>
          <p className="text-slate-400 text-sm">{stock.exchange}</p>
        </div>
        {isPositive ? <TrendingUp className="text-green-500 h-6 w-6" /> : <TrendingDown className="text-red-500 h-6 w-6" />}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Current</span>
          <span className="text-white font-semibold">${stock.adj_close.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Change</span>
          <span className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "+" : ""}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
          </span>
        </div>
        {stock.owned > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Owned</span>
            <span className="text-white font-semibold">{stock.owned}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const StockDialog = ({ stock, isOpen, onClose, onBuy, onSell }) => {
  const [quantity, setQuantity] = useState(1);

  if (!stock) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-center justify-center`}>
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-slate-900 rounded-xl p-8 max-w-2xl w-full mx-4 relative z-10 border border-slate-700">
        <h2 className="text-2xl font-bold text-white">{stock.symbol}</h2>
        <p className="text-slate-400">{stock.exchange}</p>

        <div className="h-64 my-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[{ date: "9:30", price: stock.adj_open }, { date: "16:00", price: stock.adj_close }]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#fff" }} />
              <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-4">
          <label className="text-slate-400">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 mt-1"
          />
        </div>

        {stock.owned > 0 && (
          <p className="text-slate-400 mb-4">
            You currently own: <span className="text-white font-semibold">{stock.owned}</span> shares
          </p>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => onBuy(stock, quantity)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold"
          >
            Buy Stock
          </button>
          {stock.owned > 0 && (
            <button
              onClick={() => onSell(stock, quantity)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold"
              disabled={quantity > stock.owned}
            >
              Sell Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { stocks, getAllStocks, verifyPayment, buyStock, sellStock } = useStockStore();
  const [selectedStock, setSelectedStock] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getAllStocks();
  }, [getAllStocks]);

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setIsDialogOpen(true);
  };

  const handleBuyStock = async (stock, quantity) => {
    try {
      // ✅ Step 1: Create order in backend
      const orderResponse = await axiosInstance.post("/transaction/buy-stock", { symbol: stock.symbol, quantity });
  
      if (!orderResponse.data.success) {
        toast.error("Failed to create order");
        return;
      }
  
      const { order, key_id, amount } = orderResponse.data;
  
      loadRazorpay(() => {
        const options = {
          key: key_id,
          amount: amount * 100, // Convert to paisa
          currency: "INR",
          name: stock.symbol,
          description: `Buying ${quantity} shares`,
          order_id: order.id, // ✅ Pass order_id here
          handler: async function (response) {
            console.log("Payment Response:", response);
  
            // ✅ Step 3: Verify Payment in backend
            const verifyResponse = await axiosInstance.post("/transaction/verify-payment", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });
  
            if (verifyResponse.data.success) {
              await buyStock(stock, quantity);
              setIsDialogOpen(false);
              toast.success("Stock purchased successfully!");
            } else {
              toast.error("Payment verification failed");
            }
          },
          prefill: { name: "User", email: "user@example.com", contact: "9999999999" },
          theme: { color: "#22c55e" },
        };
  
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Purchase failed. Try again.");
    }
  };
  

  const handleSellStock = async (stock, quantity) => {
    if (quantity > stock.owned) {
      toast.error("Cannot sell more shares than owned");
      return;
    }

    try {
      await sellStock(stock, quantity);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Sell failed");
      console.error("Error selling stock:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      
      <h1 className="text-4xl font-bold text-center mb-8">Stock Trading Dashboard</h1>

      {stocks.length === 0 ? (
        <p className="text-center text-gray-400">Loading stocks...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock) => (
            <StockCard key={stock._id} stock={stock} onClick={handleStockClick} />
          ))}
        </div>
      )}

      <StockDialog 
        stock={selectedStock} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onBuy={handleBuyStock} 
        onSell={handleSellStock} 
      />
    </div>
  );
};

export default App;