import React, { useState, useMemo } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { format } from "date-fns";

const StockChart = ({ data, color = "#6366f1" }) => {
  const [hoveredData, setHoveredData] = useState(null);

  const processedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      formattedDate: format(new Date(item.date), "MMM dd, yyyy"),
      percentChange: ((item.adj_close - item.adj_open) / item.adj_open) * 100,
      // For the bar chart representing open to close range
      barStart: Math.min(item.adj_open, item.adj_close),
      barEnd: Math.max(item.adj_open, item.adj_close),
      // Color determination for up/down days
      isPositive: item.adj_close >= item.adj_open,
    }));
  }, [data]);

  const minValue = Math.min(...data.map((item) => item.adj_low)) * 0.995;
  const maxValue = Math.max(...data.map((item) => item.adj_high)) * 1.005;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-xl border border-white/20">
          <p className="text-indigo-200 font-medium">{data.formattedDate}</p>
          <div className="mt-2 space-y-1">
            <p className="text-white">
              Open: <span className="font-medium">${data.adj_open.toFixed(2)}</span>
            </p>
            <p className="text-white">
              Close: <span className="font-medium">${data.adj_close.toFixed(2)}</span>
            </p>
            <p className="text-white">
              High: <span className="font-medium">${data.adj_high.toFixed(2)}</span>
            </p>
            <p className="text-white">
              Low: <span className="font-medium">${data.adj_low.toFixed(2)}</span>
            </p>
            <p className={data.percentChange >= 0 ? "text-green-400" : "text-red-400"}>
              Change: <span className="font-medium">{data.percentChange.toFixed(2)}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { x, y, width, height, payload } = props;
    
    // Use green for positive days, red for negative days
    const fill = payload.isPositive ? "#10b981" : "#ef4444";
    
    return <rect x={x} y={y} width={width} height={height} fill={fill} />;
  };

  return (
    <div className="w-full h-[500px] p-6 bg-slate-900 rounded-xl shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          onMouseMove={(e) => {
            if (e && e.activePayload) {
              setHoveredData(e.activePayload[0].payload);
            }
          }}
          onMouseLeave={() => setHoveredData(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />

          <XAxis
            dataKey="formattedDate"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#1e293b" }}
            tickLine={{ stroke: "#1e293b" }}
          />

          <YAxis
            domain={[minValue, maxValue]}
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#1e293b" }}
            tickLine={{ stroke: "#1e293b" }}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />

          <Tooltip content={<CustomTooltip />} />
          
          <Legend 
            payload={[
              { value: 'Price Range', type: 'rect', color: '#6366f1' },
              { value: 'High/Low', type: 'line', color: '#94a3b8' }
            ]}
          />

          {/* Bar from open to close */}
          <Bar
            dataKey="barEnd"
            fill="transparent"
            stroke="none"
            barSize={12}
            shape={<CustomBar />}
            baseValue="barStart"
          />

          {/* Line for high-low range */}
          <Line
            type="monotone"
            dataKey="adj_high"
            stroke="#94a3b8"
            dot={false}
          />
          
          <Line
            type="monotone"
            dataKey="adj_low" 
            stroke="#94a3b8"
            dot={false}
          />

          {/* Reference line for hovered value */}
          {hoveredData && (
            <ReferenceLine
              y={hoveredData.adj_close}
              stroke="rgba(255,255,255,0.4)"
              strokeDasharray="3 3"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {hoveredData && (
        <div className="mt-4 text-center">
          <p className="text-white text-lg font-medium">
            {hoveredData.symbol || "Stock"} - {hoveredData.formattedDate}
          </p>
          <p
            className={`text-lg font-bold ${
              hoveredData.percentChange >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            ${hoveredData.adj_close.toFixed(2)}
            <span className="ml-2">
              ({hoveredData.percentChange >= 0 ? "+" : ""}
              {hoveredData.percentChange.toFixed(2)}%)
            </span>
          </p>
          <div className="flex justify-center gap-6 mt-2 text-white">
            <p>Open: ${hoveredData.adj_open.toFixed(2)}</p>
            <p>High: ${hoveredData.adj_high.toFixed(2)}</p>
            <p>Low: ${hoveredData.adj_low.toFixed(2)}</p>
            <p>Close: ${hoveredData.adj_close.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockChart;