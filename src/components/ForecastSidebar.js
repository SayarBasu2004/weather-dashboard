import { motion } from "framer-motion";

function ForecastSidebar({ data }) {
  const days = data.list.filter((_, i) => i % 8 === 0);

  return (
    <div>
      <h2 className="sidebar-title">Forecast</h2>

      {/* TODAY */}
      <div className="today-card">
        <p>Today</p>
        <h1>{Math.round(days[0].main.temp)}°</h1>
        <span>{days[0].weather[0].main}</span>
      </div>

      {/* LIST */}
      <div className="forecast-list">
        {days.map((day, i) => {
          const temp = Math.round(day.main.temp);
          const min = Math.round(day.main.temp_min);
          const max = Math.round(day.main.temp_max);

          const width = ((temp - min) / (max - min + 1)) * 100;

          return (
            <motion.div
              key={i}
              className="forecast-card"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <div className="day">
                  {new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </div>
                <div className="cond">
                  {day.weather[0].main}
                </div>
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt=""
              />

              <div className="right">
                <div className="temp">{temp}°</div>
                <div className="range">{min}° / {max}°</div>

                <div className="temp-bar">
                  <div
                    className="temp-fill"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastSidebar;