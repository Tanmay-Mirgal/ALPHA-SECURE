import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { generatePOS } from "../components/GeneratePOS/GeneratePOS";

export const useStockStore = create((set) => ({
  stocks: [],

  getAllStocks: async () => {
    try {
      const response = await axiosInstance.get("/stocks/get-all-stock");
      if (Array.isArray(response.data.stocks)) {
        set({ stocks: response.data.stocks });
        toast.success("Stocks loaded successfully!");
      } else {
        console.error("Invalid API response: expected an array", response.data);
        toast.error("Failed to load stocks: Invalid API response");
        set({ stocks: [] });
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
      toast.error("Failed to fetch stocks");
      set({ stocks: [] });
    }
  },

  verifyPayment: async (paymentId, orderId, signature) => {
    try {
      const response = await axiosInstance.post("/transaction/verify-payment", {
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        razorpay_signature: signature
      });
      return response.data.success;
    } catch (error) {
      console.error("Payment verification failed:", error);
      return false;
    }
  },

  buyStock: async (stock, quantity = 1) => {
    try {
      const response = await axiosInstance.post("/transaction/buy-stock", { 
        symbol: stock.symbol, 
        quantity 
      });

      if (response.data.success) {
        // Generate POS for successful purchase
        generatePOS({
          symbol: stock.symbol,
          quantity,
          price: stock.adj_close,
          type: 'BUY',
          timestamp: new Date().toISOString(),
          transactionId: response.data.order.id
        });

        toast.success(`Bought ${quantity} shares of ${stock.symbol}`);
        set((state) => ({
          stocks: state.stocks.map((s) =>
            s.symbol === stock.symbol ? { ...s, owned: (s.owned || 0) + quantity } : s
          ),
        }));
      }
    } catch (error) {
      console.error("Error buying stock:", error);
      toast.error("Failed to process the transaction.");
    }
  },

  sellStock: async (stock, quantity = 1) => {
    try {
      const response = await axiosInstance.post("/transaction/sell-stock", { 
        symbol: stock.symbol, 
        quantity 
      });

      if (response.data.success) {
        // Generate POS for successful sale
        generatePOS({
          symbol: stock.symbol,
          quantity,
          price: stock.adj_close,
          type: 'SELL',
          timestamp: new Date().toISOString(),
          transactionId: response.data.order.id
        });

        toast.success(`Sold ${quantity} shares of ${stock.symbol}`);
        set((state) => ({
          stocks: state.stocks.map((s) =>
            s.symbol === stock.symbol ? { ...s, owned: Math.max((s.owned || 0) - quantity, 0) } : s
          ),
        }));
      }
    } catch (error) {
      console.error("Error selling stock:", error);
      toast.error("Failed to process the transaction.");
    }
  }
}));