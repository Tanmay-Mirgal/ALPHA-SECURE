import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";

const StockPredictor = () => {
  const [stockName, setStockName] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const fetchPrediction = async () => {
    if (!stockName) {
      setError("Please enter a stock ticker.");
      return;
    }
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
      }
    } catch (err) {
      setError("Failed to fetch data. Make sure the backend is running.");
    }
  };

  // Prepare chart data
  const chartData = prediction
    ? [
        { name: "Predicted Price", value: prediction["Predicted Price"] },
        { name: "Recommended Sell Price", value: prediction["Recommended Sell Price"] },
        { name: "Estimated Profit", value: prediction["Estimated Profit"] },
      ]
    : [];

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Stock Price Prediction</h2>
      <input
        type="text"
        placeholder="Enter stock ticker"
        value={stockName}
        onChange={(e) => setStockName(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <button
        onClick={fetchPrediction}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Predict
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {prediction && (
        <div className="p-4 bg-gray-100 rounded-md">
          <p><strong>Stock:</strong> {prediction.Stock}</p>
          <p><strong>Predicted Price:</strong> ₹{prediction["Predicted Price"].toFixed(2)}</p>
          <p><strong>Recommended Sell Price:</strong> ₹{prediction["Recommended Sell Price"].toFixed(2)}</p>
          <p><strong>Estimated Profit:</strong> ₹{prediction["Estimated Profit"].toFixed(2)}</p>

          {/* Stock Price Line Graph */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Stock Price Line Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stock Price Bar Graph */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Stock Price Bar Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPredictor;