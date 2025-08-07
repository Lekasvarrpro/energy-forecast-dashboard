import React, { useState, useEffect } from "react";
import CalendarHeatmap from "./components/CalendarHeatmap";
import DayForecast from "./components/DayForecast";
import YearForecast from "./components/YearForecast";
import ForecastControls from "./components/ForecastControls";
import useEnergyData from "./utils/useEnergyData";
import getMonthlyTotals from "./utils/getMonthlyTotals";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherStormy,
  TiWeatherSunny,
} from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [forecastView, setForecastView] = useState("month");
  const [showForecast, setShowForecast] = useState(false);
  const energyData = useEnergyData();
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const weatherIcons = [
    { id: "cloudy", icon: TiWeatherCloudy },
    { id: "downpour", icon: TiWeatherDownpour },
    { id: "stormy", icon: TiWeatherStormy },
    { id: "sunny", icon: TiWeatherSunny },
  ];

  const [weatherIndex, setWeatherIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setWeatherIndex((prev) => (prev + 1) % weatherIcons.length);
      }, 500);
    } else {
      setWeatherIndex(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleForecastTypeChange = (type) => {
    setForecastView(type);
    setShowForecast(false);
    setHasGenerated(false);
  };

  const handleGenerate = () => {
    setShowForecast(false);
    setHasGenerated(false);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowForecast(true);
      setHasGenerated(true);
      if (forecastView === "year") {
        const yearViewEl = document.getElementById("year-forecast-view");
        if (yearViewEl) {
          yearViewEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 2500);
  };

  const filteredData = energyData.filter((entry) => {
    const entryDate = new Date(entry.date);
    if (forecastView === "day") {
      return (
        entryDate.getFullYear() === selectedDate.getFullYear() &&
        entryDate.getMonth() === selectedDate.getMonth() &&
        entryDate.getDate() === selectedDate.getDate()
      );
    } else if (forecastView === "month") {
      return (
        entryDate.getFullYear() === selectedDate.getFullYear() &&
        entryDate.getMonth() === selectedDate.getMonth()
      );
    } else if (forecastView === "year") {
      return entryDate.getFullYear() === selectedDate.getFullYear();
    }
    return false;
  });

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(90deg, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
      }}
    >
      <h1 className="text-3xl font-bold mb-4 text-center text-white">
        Energy Forecast Dashboard
      </h1>

      <ForecastControls
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        forecastView={forecastView}
        onForecastTypeChange={handleForecastTypeChange}
        onGenerate={handleGenerate}
      />

      <div className="mt-6">
        {isGenerating ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={weatherIcons[weatherIndex].id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex justify-center items-center"
                  >
                    <div className="animate-spin text-white text-6xl">
                      {React.createElement(weatherIcons[weatherIndex].icon)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-4 text-white text-lg font-semibold">
                Generating forecast...
              </p>
            </div>
          </div>
        ) : (
          <>
            {forecastView === "month" && (
              <CalendarHeatmap
                data={showForecast ? filteredData : []}
                selectedMonth={selectedDate}
                hasGenerated={hasGenerated}
              />
            )}
            {forecastView === "day" && showForecast && (
              <DayForecast data={filteredData} date={selectedDate} />
            )}
            {forecastView === "year" && showForecast && (
              <div id="year-forecast-view">
                <YearForecast
                  data={getMonthlyTotals(filteredData)}
                  showForecast={showForecast}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;