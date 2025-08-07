import React from "react";

const DayForecast = ({ data, date }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-600">No data for selected day.</p>;
  }

  const entry = data[0];

  return (
    <div className="bg-gray-900 shadow p-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">
        Energy Usage for {date.toDateString()}
      </h2>
      <ul className="space-y-2 text-white">
  <li>
    <strong>Temperature:</strong> <span className="text-green-300">{entry.temperature}°C</span>
  </li>
  <li>
    <strong>Total Energy:</strong> <span className="text-green-300">{entry.energy} kWh</span>
  </li>
  <li>
    <strong>AC:</strong> <span className="text-green-300">{entry.AC} kWh</span>
  </li>
  <li>
    <strong>Fridge:</strong> <span className="text-green-300">{entry.Fridge} kWh</span>
  </li>
  <li>
    <strong>Fan:</strong> <span className="text-green-300">{entry.Fan} kWh</span>
  </li>
  <li>
    <strong>Heater:</strong> <span className="text-green-300">{entry.Heater} kWh</span>
  </li>
  <li>
    <strong>Washing Machine:</strong> <span className="text-green-300">{entry.WashingMachine} kWh</span>
  </li>
  <li>
    <strong>TV:</strong> <span className="text-green-300">{entry.TV} kWh</span>
  </li>
  <li>
    <strong>Lights:</strong> <span className="text-green-300">{entry.Lights} kWh</span>
  </li>
  <li>
    <strong>Computer:</strong> <span className="text-green-300">{entry.Computer} kWh</span>
  </li>
</ul>

    </div>
  );
};

export default DayForecast;
