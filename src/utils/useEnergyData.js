import { useEffect, useState } from "react";
import Papa from "papaparse";

const useEnergyData = () => {
  const [energyData, setEnergyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse("/data.csv", {
      download: true,
      header: true,
      dynamicTyping: true, // Ensures numeric values are correctly parsed
      complete: (result) => {
        const parsedData = result.data
          .filter((row) => row.Date && row.TotalEnergy) // Skip rows with missing values
          .map((row) => {
            const date = new Date(row.Date); // <-- use original date
            return {
              date,
              month: date.getMonth(),       // ✅ add this
              year: date.getFullYear(),     // ✅ and this
              temperature: parseFloat(row.Temperature),
              energy: parseFloat(row.TotalEnergy),
              AC: parseFloat(row.AC),
              Fridge: parseFloat(row.Fridge),
              Fan: parseFloat(row.Fan),
              Heater: parseFloat(row.Heater),
              WashingMachine: parseFloat(row.WashingMachine),
              TV: parseFloat(row.TV),
              Lights: parseFloat(row.Lights),
              Computer: parseFloat(row.Computer),
            };
          });
        setEnergyData(parsedData);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });
  }, []);

  return energyData;
};

export default useEnergyData;
