import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

function HourlyChart({ data }) {
  const [type, setType] = useState("temp");
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const hours = data?.list?.slice(0, 8) || [];

  const labels = hours.map((i) =>
    i.dt_txt.split(" ")[1].slice(0, 5)
  );

  const temps = hours.map((i) =>
    Math.round(i.main.temp)
  );

  const humidity = hours.map((i) =>
    i.main.humidity
  );

  useEffect(() => {
    if (!chartRef.current || hours.length === 0) return;

    const ctx = chartRef.current.ctx;

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#38bdf8");
    gradient.addColorStop(0.5, "#8b5cf6");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    setChartData({
      labels,
      datasets: [
        {
          label: type === "temp" ? "Temperature" : "Humidity",
          data: type === "temp" ? temps : humidity,
          fill: true,
          backgroundColor: gradient,
          borderColor:
            type === "temp" ? "#38bdf8" : "#34d399",
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 3,
        },
      ],
    });
  }, [type, data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#020617",
        borderColor: "#38bdf8",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${
              context.raw
            } ${type === "temp" ? "°C" : "%"}`;
          },
        },
      },
    },

    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.03)",
        },
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
        },
      },
    },
  };

  if (!data || !data.list) {
    return (
      <div className="chart-card">
        <p style={{ opacity: 0.6 }}>Loading chart...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HEADER */}
      <div className="chart-header">
        <h2>
          Hourly Trend
          <span className="unit">
            {type === "temp" ? "°C" : "%"}
          </span>
        </h2>

        <div className="chart-toggle">
          <button
            className={type === "temp" ? "active" : ""}
            onClick={() => setType("temp")}
          >
            Temp
          </button>

          <button
            className={type === "humidity" ? "active" : ""}
            onClick={() => setType("humidity")}
          >
            Humidity
          </button>
        </div>
      </div>

      {/* CHART */}
      <div className="chart-container">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </motion.div>
  );
}

export default HourlyChart;