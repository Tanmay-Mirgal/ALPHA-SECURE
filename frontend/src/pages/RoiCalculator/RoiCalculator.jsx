import { useState } from "react";

export default function ROICalculator() {
  const [investment, setInvestment] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [cost, setCost] = useState(0);
  
  const calculateROI = () => {
    if (investment === 0) return "N/A";
    const roi = ((revenue - cost) / investment) * 100;
    return roi.toFixed(2) + "%";
  };

  const roi = calculateROI();
  const isPositive = roi !== "N/A" && parseFloat(roi) > 0;
  const isNegative = roi !== "N/A" && parseFloat(roi) < 0;
  
  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg mt-10 border border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">ROI Calculator</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Initial Investment ($)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={investment || ""}
              onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
              className="w-full pl-8 p-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Revenue ($)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={revenue || ""}
              onChange={(e) => setRevenue(parseFloat(e.target.value) || 0)}
              className="w-full pl-8 p-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Cost ($)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={cost || ""}
              onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
              className="w-full pl-8 p-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-400 mb-2">Return on Investment</p>
          <div className={`text-2xl font-bold p-3 rounded-lg ${
            isPositive ? "bg-green-900 text-green-300" : 
            isNegative ? "bg-red-900 text-red-300" : 
            "bg-gray-700 text-gray-300"
          }`}>
            {roi}
          </div>
        </div>
        
        {roi !== "N/A" && (
          <p className="text-sm text-gray-400 mt-4 text-center">
            {isPositive ? "Positive ROI - Your investment is profitable." : 
             isNegative ? "Negative ROI - Your investment is currently at a loss." : 
             "Break-even - Your investment has neither profit nor loss."}
          </p>
        )}
      </div>
    </div>
  );
}