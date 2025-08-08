// Inside DayForecast.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "url(#gradGreen)", // Lights
  "url(#gradYellow)", // AC
  "url(#gradRed)", // Fridge
  "url(#gradBlue)", // Fan
  "url(#gradPurple)", // Heater
  "url(#gradTeal)", // Washing Machine
  "url(#gradOrange)", // TV
  "url(#gradPink)" // Computer
];

const DonutChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg w-full h-80">
      <ResponsiveContainer>
        <PieChart>
          <defs>
            <linearGradient id="gradGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#57C785" />
              <stop offset="100%" stopColor="#2E8B57" />
            </linearGradient>
            <linearGradient id="gradYellow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EDDD53" />
              <stop offset="100%" stopColor="#C9B037" />
            </linearGradient>
            <linearGradient id="gradRed" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF5C5C" />
              <stop offset="100%" stopColor="#C0392B" />
            </linearGradient>
            <linearGradient id="gradBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4FC3F7" />
              <stop offset="100%" stopColor="#0288D1" />
            </linearGradient>
            <linearGradient id="gradPurple" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#BA68C8" />
              <stop offset="100%" stopColor="#6A1B9A" />
            </linearGradient>
            <linearGradient id="gradTeal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4DB6AC" />
              <stop offset="100%" stopColor="#00695C" />
            </linearGradient>
            <linearGradient id="gradOrange" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#E65100" />
            </linearGradient>
            <linearGradient id="gradPink" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F48FB1" />
              <stop offset="100%" stopColor="#AD1457" />
            </linearGradient>
          </defs>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            isAnimationActive={true}
            animationDuration={800}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `${value} kWh`} />
          {/* Center text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white font-bold text-lg"
          >
            {total.toFixed(1)} kWh
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
