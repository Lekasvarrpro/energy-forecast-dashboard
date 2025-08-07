const getMonthlyTotals = (data) => {
  const monthlyTotals = {};

  data.forEach((entry) => {
    if (!entry.date || isNaN(entry.energy)) return;

    const date = new Date(entry.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (!monthlyTotals[monthKey]) {
      monthlyTotals[monthKey] = 0;
    }

    monthlyTotals[monthKey] += entry.energy;
  });

  // Convert to array format for chart or table
  return Object.entries(monthlyTotals).map(([key, total]) => {
    const [year, month] = key.split("-");
    return {
      month: `${new Date(year, month).toLocaleString("default", {
        month: "long",
      })} ${year}`,
      totalEnergy: parseFloat(total.toFixed(2)),
    };
  });
};

export default getMonthlyTotals;
