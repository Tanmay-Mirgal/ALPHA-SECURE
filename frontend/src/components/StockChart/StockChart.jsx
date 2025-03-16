import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
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

  return (
    <div className="w-full h-[500px] p-6 bg-slate-900 rounded-xl shadow-lg">
      <ResponsiveContainer>
        <LineChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          onMouseMove={(e) => {
            if (e.activePayload) {
              setHoveredData(e.activePayload[0].payload);
            }
          }}
          onMouseLeave={() => setHoveredData(null)}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

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

          <ReferenceLine
            y={hoveredData?.adj_open}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="adj_close"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              stroke: "#fff",
              strokeWidth: 2,
              fill: color,
            }}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />

          <Line
            type="monotone"
            dataKey="adj_high"
            stroke={`${color}44`}
            strokeWidth={1}
            dot={false}
            activeDot={false}
          />

          <Line
            type="monotone"
            dataKey="adj_low"
            stroke={`${color}44`}
            strokeWidth={1}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {hoveredData && (
        <div className="mt-4 text-center">
          <p className="text-white text-lg font-medium">
            {hoveredData.symbol} - {hoveredData.formattedDate}
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
        </div>
      )}
    </div>
  );
};

export default StockChart;
