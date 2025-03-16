import StockPrice from "../models/stockModel.js";
import User from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order for buying stock
const generateReceipt = (prefix, userId, symbol) => {
    return `${prefix}_${userId}_${symbol}_${Date.now()}`.slice(0, 40);
  };
  
  // Create Razorpay order for buying stock
  export const createBuyOrder = async (req, res) => {
    try {
      const { symbol, quantity } = req.body;
      const userId = req.user._id;
  
      if (!userId || !symbol || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid input data" });
      }
  
      const stock = await StockPrice.findOne({ symbol }).sort({ date: -1 });
      if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
      }
  
      const amount = stock.open * quantity * 100; // Amount in paise
  
      const options = {
        amount,
        currency: "INR",
        receipt: generateReceipt("buy_stock", userId, symbol),
        notes: { userId, symbol, quantity, type: "BUY", stockId: stock._id.toString() }
      };
  
      const order = await razorpay.orders.create(options);
  
     
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const existingStock = user.stocks.find(s => s.symbol === symbol);
      if (existingStock) {
        existingStock.quantity += quantity;
      } else {
        user.stocks.push({ stock: stock._id, symbol, quantity });
      }
      await user.save();
  
      res.status(200).json({ success: true, order, amount: amount / 100, key_id: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
      console.error("Error creating buy order:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  };
  
  
  // Create Razorpay order for selling stock (to handle any transaction fees)
  export const createSellOrder = async (req, res) => {
    try {
      const {  symbol, quantity } = req.body;
      const userId = req.user._id;
      if (!userId || !symbol || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid input data" });
      }
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const stockIndex = user.stocks.findIndex(s => s.symbol === symbol);
      if (stockIndex === -1 || user.stocks[stockIndex].quantity < quantity) {
        return res.status(400).json({ message: "Insufficient stock to sell" });
      }
      
      const stock = await StockPrice.findOne({ symbol }).sort({ date: -1 });
      if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
      }
      
      // For selling, you might want to charge a small fee
      const fee = 10 * 100; // 10 rupees in paise
      
      const options = {
        amount: fee,
        currency: "INR",
        receipt: generateReceipt("sell_stock", userId, symbol),
        notes: {
          userId,
          symbol,
          quantity,
          type: "sell"
        }
      };
      
      const order = await razorpay.orders.create(options);
      
      // Remove stock from user's portfolio
      user.stocks[stockIndex].quantity -= quantity;
      if (user.stocks[stockIndex].quantity === 0) {
        user.stocks.splice(stockIndex, 1);
      }
      await user.save();
      
      res.status(200).json({
        success: true,
        order,
        amount: fee,
        key_id: process.env.RAZORPAY_KEY_ID
      });
    } catch (error) {
      console.error("Error creating sell order:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  };

// Verify Razorpay payment and complete the transaction
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    
    const isAuthentic = expectedSignature === razorpay_signature;
    
    if (!isAuthentic) {
      return res.status(400).json({ message: "Payment verification failed" });
    }
    
    // Get the order details to retrieve the transaction information
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const { userId, symbol, quantity, type } = order.notes;
    
    if (type === "BUY") {
      await processBuyStock(userId, symbol, parseInt(quantity), res);
    } else if (type === "SELL") {
      await processSellStock(userId, symbol, parseInt(quantity), res);
    } else {
      res.status(400).json({ message: "Invalid transaction type" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

// Process the actual stock purchase after payment verification
export const processBuyStock = async (userId, symbol, quantity, res) => {
  try {
    console.log("Processing stock purchase...");
    console.log("User ID:", userId);
    console.log("Stock Symbol:", symbol);
    console.log("Quantity:", quantity);

    // ✅ Step 1: Find User
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    // ✅ Step 2: Find Stock
    const stock = await StockPrice.findOne({ symbol }).sort({ date: -1 });
    if (!stock) {
      console.log("Stock not found");
      return res.status(404).json({ message: "Stock not found" });
    }

    console.log("Stock found:", stock);

    // ✅ Step 3: Update User's Stock Holdings
    let existingStock = user.stocks.find(s => s.symbol === symbol);
    
    if (existingStock) {
      console.log("Existing stock found. Updating quantity...");
      existingStock.quantity += quantity; // 🔥 Fix: Update quantity directly
    } else {
      console.log("Adding new stock to portfolio...");
      user.stocks.push({ stock: stock._id, symbol, quantity });
    }

    console.log("Updated user portfolio:", user.stocks);

    // ✅ Step 4: Save User
    await user.save();
    console.log("User stock purchase successful!");

    return res.status(200).json({ success:true ,message: "Stock purchased successfully", user });

  } catch (error) {
    console.error("❌ Error processing buy stock:", error);
    return res.status(500).json({ success:false ,message: "Failed to process stock purchase" });
  }
};


// Process the actual stock sale after payment verification
export const processSellStock = async (userId, symbol, quantity, res) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const stockIndex = user.stocks.findIndex(s => s.symbol === symbol);
    if (stockIndex === -1 || user.stocks[stockIndex].quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock to sell" });
    }
    
    user.stocks[stockIndex].stock.quantity -= quantity;
    if (user.stocks[stockIndex].quantity === 0) {
      user.stocks.splice(stockIndex, 1);
    }
    
    await user.save();
    res.status(200).json({ message: "Stock sold successfully", user });
  } catch (error) {
    console.error("Error processing sell stock:", error);
    res.status(500).json({ message: "Failed to process stock sale" });
  }
};