import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./Dashboard.css";

import Navbar from "../components/Navbar";
import WeatherHero from "../components/WeatherHero";
import HourlyChart from "../components/HourlyChart";
import ForecastSidebar from "../components/ForecastSidebar";
import StatsCards from "../components/StatsCards";
import WeatherAlert from "../components/WeatherAlert";

import {
  getCurrentWeather,
  getForecast,
} from "../services/weatherService";

function Dashboard() {
  const [city, setCity] = useState("Kolkata");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const current = await getCurrentWeather(city);
      const forecastData = await getForecast(city);

      setWeather(current);
      setForecast(forecastData);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* LEFT SIDE */}
      <div className="left">
        <Navbar setCity={setCity} />

        {/* 🔥 LOADING STATE */}
        {loading && (
          <div className="loading">
            <p>Fetching weather data...</p>
          </div>
        )}

        {/* 🔥 MAIN CONTENT */}
        {!loading && weather && (
          <>
            <WeatherAlert data={weather} />
            <WeatherHero data={weather} />
          </>
        )}

        {!loading && forecast?.list && (
          <>
            <HourlyChart data={forecast} />
            <StatsCards data={forecast} />
          </>
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="right">
        {!loading && forecast?.list && (
          <ForecastSidebar data={forecast} />
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;