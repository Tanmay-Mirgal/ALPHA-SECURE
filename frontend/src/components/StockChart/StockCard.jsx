import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';



const calculateMA = (data, period) => {
  return data.map((entry, index) => {
    if (index < period - 1) return { ...entry, MA: null };
    const sum = data.slice(index - period + 1, index + 1).reduce((acc, curr) => acc + curr.close, 0);
    return { ...entry, [`MA${period}`]: sum / period };
  });
};

const StockChart = ({ stock }) => {
  // Generate more realistic sample data
  const basePrice = stock.adj_close;
  const volatility = basePrice * 0.02; // 2% volatility

  const generatePrice = (base) => {
    return base + (Math.random() - 0.5) * volatility;
  };

  const data = Array.from({ length: 100 }, (_, i) => {
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - (100 - i) * 15);
    
    const close = generatePrice(basePrice);
    return {
      time: timestamp.toLocaleTimeString(),
      close,
      volume: Math.floor(Math.random() * 100000) + 50000,
    };
  });

  // Calculate moving averages
  const dataWithMA = calculateMA(calculateMA(data, 20), 50);

  // Calculate VWAP
  let cumulativeTPV = 0;
  let cumulativeVolume = 0;
  const dataWithVWAP = dataWithMA.map((entry) => {
    cumulativeTPV += entry.close * entry.volume;
    cumulativeVolume += entry.volume;
    return {
      ...entry,
      VWAP: cumulativeTPV / cumulativeVolume,
    };
  });

  return (
    <div className="w-full h-[400px] bg-slate-800 p-4 rounded-xl">
      <ResponsiveContainer>
        <LineChart data={dataWithVWAP} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            interval={19}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            yAxisId="left"
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            domain={['auto', 'auto']}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#9CA3AF' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{
              paddingBottom: '20px',
              color: '#fff',
            }}
          />
          <ReferenceLine
            y={stock.adj_close}
            stroke="#6B7280"
            strokeDasharray="3 3"
            label={{
              value: 'Current Price',
              fill: '#9CA3AF',
              position: 'right',
            }}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#10B981"
            dot={false}
            name="Price"
            yAxisId="left"
          />
          <Line
            type="monotone"
            dataKey="MA20"
            stroke="#3B82F6"
            dot={false}
            name="MA20"
            yAxisId="left"
          />
          <Line
            type="monotone"
            dataKey="MA50"
            stroke="#EF4444"
            dot={false}
            name="MA50"
            yAxisId="left"
          />
          <Line
            type="monotone"
            dataKey="VWAP"
            stroke="#F59E0B"
            dot={false}
            name="VWAP"
            yAxisId="left"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;