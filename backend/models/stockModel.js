import mongoose from "mongoose";

const stockPriceSchema = new mongoose.Schema({
  open: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  adj_high: {
    type: Number,
    required: true
  },
  adj_low: {
    type: Number,
    required: true
  },
  adj_close: {
    type: Number,
    required: true
  },
  adj_open: {
    type: Number,
    required: true
  },
  adj_volume: {
    type: Number,
    required: true
  },
  split_factor: {
    type: Number,
    required: true,
    default: 1.0
  },
  dividend: {
    type: Number,
    required: true,
    default: 0.0
  },
  symbol: {
    type: String,
    required: true,
    index: true
  },
  exchange: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

// Creating compound index for efficient querying by symbol and date
stockPriceSchema.index({ symbol: 1, date: 1 }, { unique: true });

const StockPrice = mongoose.model('StockPrice', stockPriceSchema);

export default StockPrice;