import React from "react";
import { FaPlay } from "react-icons/fa";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ForecastControls = ({
  selectedDate,
  onDateChange,
  forecastView,
  onForecastTypeChange,
  onGenerate,
}) => {
  return (
   <div className="flex flex-col items-center gap-4 mb-4 p-6 bg-white shadow-xl shadow-gray-900 rounded-xl w-fit mx-auto">
      {/* Date Picker on top */}
      <Toaster position="top-right"/>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => onDateChange(new Date(e.target.value))}
        className="border border-gray-300 px-3 py-2 rounded"
      />

      {/* Forecast buttons centered */}
      <div className="flex gap-2">
        <button
          className={`px-4 cursor-pointer py-2 rounded ${
            forecastView === "day" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => onForecastTypeChange("day")}
        >
          Day
        </button>
        <button
          className={`px-4 cursor-pointer py-2 rounded ${
            forecastView === "month" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => onForecastTypeChange("month")}
        >
          Month
        </button>
        <button
          className={`px-4 cursor-pointer py-2 rounded ${
            forecastView === "year" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => onForecastTypeChange("year")}
        >
          Year
        </button>
      </div>

      {/* Generate button centered at bottom */}
      <div>
        <button
        onClick={()=> {
          onGenerate();
          toast.success("Generated forecast successfully!");
        }}
        className="bg-green-600 text-white px-6 py-2 rounded flex items-center gap-2 cursor-pointer hover:bg-black hover:text-white transition duration-400 ease-in-out active:scale-[0.7]"
      >
        <FaPlay className="text-sm"/> Generate
      </button>
      </div>
    </div>
  );
};

export default ForecastControls;
