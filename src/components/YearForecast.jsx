import React from "react";

const monthNames = [
  "January", "Febuary", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Background color logic
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

// ✅ Always return white text
const getMonthTextColor = () => "text-white";

const YearForecast = ({ data, showForecast }) => {
  if (!showForecast) return null;

  return (
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
          value = `${(Math.random() * 500 + 100).toFixed(1)} kWh`; // August random
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
  );
};

export default YearForecast;
