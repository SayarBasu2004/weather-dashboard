import { useState } from "react";
import { motion } from "framer-motion";

function Navbar({ setCity }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (!input.trim()) return;
    setCity(input);
    setInput("");
  };

  return (
    <motion.div
      className="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="nav-search">
        <input
          value={input}
          placeholder="Search city..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button onClick={handleSearch}>Search</button>
      </div>
    </motion.div>
  );
}

export default Navbar;