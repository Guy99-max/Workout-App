// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { WorkoutProvider } from "./context/WorkoutContext";
import Home from "./pages/Home.jsx";
import Workout from "./pages/Workout.jsx";
import Profile from "./pages/Profile.jsx";
import MyWorkouts from "./pages/MyWorkouts.jsx";
import CreateWorkout from "./pages/CreateWorkout.jsx";

export default function App() {
  return (
    <WorkoutProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-workouts" element={<MyWorkouts />} />
        <Route path="/create" element={<CreateWorkout />} />
      </Routes>
    </WorkoutProvider>
  );
}
