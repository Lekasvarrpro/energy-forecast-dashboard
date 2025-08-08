import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const HistogramChart = ({ data }) => {
  // Define a gradient for the bars
  const gradientId = "histogramGradient";

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-white mb-4">
        Appliance Usage (kWh)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={28}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            stroke="#cbd5e1"
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
          />
          <YAxis
            stroke="#cbd5e1"
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
            domain={[0, "dataMax + 5"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "0.5rem",
              color: "#f1f5f9"
            }}
          />
          <Bar dataKey="value" fill={`url(#${gradientId})`} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramChart;
