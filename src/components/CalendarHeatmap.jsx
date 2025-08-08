import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

const CalendarHeatmap = ({ data, selectedMonth, hasGenerated }) => {
  const daysInMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ).getDate();

  const getDayEnergy = (day) => {
    const entry = data.find(
      (item) =>
        new Date(item.date).getDate() === day &&
        new Date(item.date).getMonth() === selectedMonth.getMonth() &&
        new Date(item.date).getFullYear() === selectedMonth.getFullYear()
    );
    return entry ? parseFloat(entry.energy) : 0;
  };

  const getColor = (energy) => {
    if (energy > 15) return "bg-red-500";
    if (energy > 10) return "bg-orange-400";
    if (energy > 5) return "bg-yellow-300";
    if (energy > 0) return "bg-green-300";
    return "bg-gray-900";
  };

  // Prepare histogram data for current month
  const histogramData = [...Array(daysInMonth)].map((_, i) => {
    const day = i + 1;
    return {
      day: day,
      energy: getDayEnergy(day)
    };
  });

  return (
    <div className="rounded-xl p-2 bg-white shadow-xl shadow-gray-900 pb-5 pl-3 pr-3">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
        Monthly Energy Overview
      </h2>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 sm:grid-cols-7 grid-cols-4 gap-1">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const energy = getDayEnergy(day);
          return (
            <div
              key={day}
              className={`h-16 rounded flex flex-col items-center justify-center text-sm text-white ${getColor(
                energy
              )}`}
            >
              <div className="font-bold">{day}</div>
              <div
                className={`${
                  hasGenerated
                    ? "text-black font-semibold"
                    : "text-green-300"
                }`}
              >
                {energy.toFixed(1)} kWh
              </div>
            </div>
          );
        })}
      </div>

      {/* Histogram for Current Month */}
      {hasGenerated && (
        <div className="mt-20">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-3">
            Daily Energy Usage (kWh) - {selectedMonth.toLocaleString("default", { month: "long" })}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={histogramData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="energy" fill="#8884d8">
                <LabelList dataKey="energy" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CalendarHeatmap;
