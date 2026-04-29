import { motion } from "framer-motion";

function WeatherAlert({ data }) {
  const temp = data.main.temp;
  const condition = data.weather[0].main.toLowerCase();

  let type = "info";
  let message = "Weather looks normal.";

  if (temp > 35) {
    type = "warning";
    message = "Heat alert! Stay hydrated.";
  } else if (condition.includes("rain")) {
    type = "info";
    message = "Rain expected. Carry an umbrella.";
  } else if (condition.includes("storm")) {
    type = "danger";
    message = "Storm warning! Stay indoors.";
  } else if (temp < 10) {
    type = "success";
    message = "Cold weather. Stay warm.";
  }

  return (
    <motion.div
      className={`alert ${type}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="alert-icon">
        {type === "warning" }
        {type === "danger" }
        {type === "info" }
        {type === "success"}
      </span>

      <p>{message}</p>
    </motion.div>
  );
}

export default WeatherAlert;