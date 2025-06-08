import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleSidebar}>
          Home
        </Link>
        <Link to="/register" onClick={toggleSidebar}>
          Register
        </Link>
        <Link to="/login" onClick={toggleSidebar}>
          Login
        </Link>
        <Link to="/create" onClick={toggleSidebar}>
          Create Workout
        </Link>
        <Link to="/view" onClick={toggleSidebar}>
          My Workouts
        </Link>
        <Link to="/profile" onClick={toggleSidebar}>
          Profile
        </Link>
      </div>
    </>
  );
}
