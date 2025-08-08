import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const DayForecast = ({ data, date }) => {
  const [selectedAppliance, setSelectedAppliance] = useState(null);

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-600">No data for selected day.</p>;
  }

  const entry = data[0];

  // Chart data
  const chartData = [
    { name: "AC", value: entry.AC },
    { name: "Fridge", value: entry.Fridge },
    { name: "Fan", value: entry.Fan },
    { name: "Heater", value: entry.Heater },
    { name: "Washing Machine", value: entry.WashingMachine },
    { name: "TV", value: entry.TV },
    { name: "Lights", value: entry.Lights },
    { name: "Computer", value: entry.Computer },
  ];

  const COLORS = [
    "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF",
    "#FF9F1C", "#9B5DE5", "#00BBF9", "#F15BB5"
  ];

  return (
    <div className="bg-gray-900 shadow p-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">
        Energy Usage for {date.toDateString()}
      </h2>

      <ul className="space-y-2 text-white">
        <li><strong>Temperature:</strong> <span className="text-green-300">{entry.temperature}°C</span></li>
        <li><strong>Total Energy:</strong> <span className="text-green-300">{entry.energy} kWh</span></li>
        <li><strong>AC:</strong> <span className="text-green-300">{entry.AC} kWh</span></li>
        <li><strong>Fridge:</strong> <span className="text-green-300">{entry.Fridge} kWh</span></li>
        <li><strong>Fan:</strong> <span className="text-green-300">{entry.Fan} kWh</span></li>
        <li><strong>Heater:</strong> <span className="text-green-300">{entry.Heater} kWh</span></li>
        <li><strong>Washing Machine:</strong> <span className="text-green-300">{entry.WashingMachine} kWh</span></li>
        <li><strong>TV:</strong> <span className="text-green-300">{entry.TV} kWh</span></li>
        <li><strong>Lights:</strong> <span className="text-green-300">{entry.Lights} kWh</span></li>
        <li><strong>Computer:</strong> <span className="text-green-300">{entry.Computer} kWh</span></li>
      </ul>

      {/* Pie Chart with Click Feature */}
      <div className="mt-15 h-64 flex gap-6">
        {/* Chart */}
        <div className="flex-1">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value} kWh`}
                onClick={(data) => setSelectedAppliance(data)}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} kWh`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Message Panel */}
        <div className="w-1/3 bg-slate-800 text-white p-2 rounded-md mr-20 shadow-md">
          {selectedAppliance ? (
            <>
              <h3 className="text-lg font-bold">{selectedAppliance.name}</h3>
              <p className="text-green-300">{selectedAppliance.value} kWh</p>
              <p className="mt-2 text-sm">
                Today <strong>{selectedAppliance.name}</strong> consumed{" "}
                <strong>{selectedAppliance.value} kWh</strong>
              </p>
            </>
          ) : (
            <p className="text-gray-400 text-sm">Click a slice to see details</p>
          )}
        </div>
      </div>

      {/* Histogram */}
      <div className="mt-20 mr-15 h-64">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip formatter={(value) => `${value} kWh`} />
            <Bar dataKey="value" fill="#4D96FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DayForecast;
