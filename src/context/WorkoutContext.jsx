// src/context/WorkoutContext.js
import React, { createContext, useState, useContext } from 'react';

const WorkoutContext = createContext();

export const useWorkout = () => {
  return useContext(WorkoutContext);
};

export const WorkoutProvider = ({ children }) => {
  const [activeWorkout, setActiveWorkout] = useState(null);

  return (
    <WorkoutContext.Provider value={{ activeWorkout, setActiveWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};
