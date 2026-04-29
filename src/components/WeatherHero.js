import { motion } from "framer-motion";

function WeatherHero({ data }) {
  const date = new Date();

  return (
    <motion.div
      className="hero-card"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="hero-left">
        <div className="top">
          <h2>{data.name}</h2>
          <span>{date.toLocaleTimeString()}</span>
        </div>

        <h1 className="temp">
          {Math.round(data.main.temp)}°
        </h1>

        <p className="desc">
          {data.weather[0].description}
        </p>

        <div className="stats">
          <div>
            <span>Feels</span>
            <h3>{Math.round(data.main.feels_like)}°</h3>
          </div>

          <div>
            <span>Humidity</span>
            <h3>{data.main.humidity}%</h3>
          </div>

          <div>
            <span>Wind</span>
            <h3>{data.wind.speed} km/h</h3>
          </div>
        </div>
      </div>

      <div className="hero-icon">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt=""
        />
      </div>
    </motion.div>
  );
}

export default WeatherHero;