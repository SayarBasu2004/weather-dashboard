import { motion } from "framer-motion";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

function StatsCards({ data }) {
  const humidity = data.list[0].main.humidity;
  const wind = data.list[0].wind.speed;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      
      {/* HUMIDITY */}
      <motion.div
        className="stat-card"
        whileHover={{ scale: 1.05 }}
      >
        <div className="stat-top">
          <WiHumidity size={30} />
          <span>Humidity</span>
        </div>

        <h1>{humidity}%</h1>

        <div className="progress">
          <div
            className="progress-fill"
            style={{ width: `${humidity}%` }}
          />
        </div>
      </motion.div>

      {/* WIND */}
      <motion.div
        className="stat-card"
        whileHover={{ scale: 1.05 }}
      >
        <div className="stat-top">
          <FaWind size={20} />
          <span>Wind</span>
        </div>

        <h1>{wind} km/h</h1>

        <div className="progress">
          <div
            className="progress-fill wind"
            style={{ width: `${Math.min(wind * 5, 100)}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default StatsCards;