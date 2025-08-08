import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

const monthNames = [
  "January", "Febuary", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getMonthBgColor = (index) => {
  if (index <= 5) {
    return "bg-red-500"; // Jan–June: Constant red
  } else if (index === 6) {
    return "bg-yellow-400"; // July: Constant yellow
  } else if (index === 7) {
    const options = ["bg-red-500", "bg-yellow-400", "bg-green-500"];
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return "bg-gray-900"; // For Sep–Dec: Future update
  }
};

const getMonthTextColor = () => "text-white";

const YearForecast = ({ data, showForecast }) => {
  if (!showForecast) return null;

  // Prepare chart data
  const chartData = monthNames.map((month, index) => {
    if (index <= 5) {
      return {
        month,
        value: data[index]?.totalEnergy
          ? Number(data[index].totalEnergy.toFixed(1))
          : 0,
        fill: "#ef4444" // Tailwind red-500
      };
    } else if (index === 6) {
      return { month, value: 300, fill: "#facc15" }; // July yellow
    } else {
      return { month, value: 0, fill: "#9ca3af" }; // Sep–Dec constant 0
    }
  });

  return (
    <div>
      {/* Existing Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-7 rounded-xl shadow-xl shadow-gray-900 bg-white">
        {Array.from({ length: 12 }).map((_, index) => {
          const entry = data[index];

          let value;
          if (index <= 5) {
            value = entry?.totalEnergy
              ? `${entry.totalEnergy.toFixed(1)} kWh`
              : "N/A";
          } else if (index === 6) {
            value = "300.0 kWh"; // July constant value
          } else if (index === 7) {
            value = "0.0 kWh"; // August 0
          } else {
            value = "Future Update"; // Sep–Dec
          }

          const bgColor = getMonthBgColor(index);
          const textColor = getMonthTextColor();

          return (
            <div
              key={index}
              className={`rounded-xl p-2 ${bgColor} ${textColor}`}
            >
              <div className="text-lg font-bold">{monthNames[index]}</div>
              <div>{value}</div>
            </div>
          );
        })}
      </div>

      {/* New Yearly Graph */}
      <div className="bg-white p-6 mt-6 rounded-xl shadow-xl shadow-gray-900">
        <h2 className="text-lg font-bold mb-4">Yearly Energy Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" isAnimationActive={false}>
              <LabelList dataKey="value" position="top" />
              {chartData.map((entry, index) => (
                <cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearForecast;
