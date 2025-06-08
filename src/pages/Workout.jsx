import React, { useMemo } from "react";
import { useWorkout } from "../context/WorkoutContext";

export default function Workout() {
  const { activeWorkout } = useWorkout();

  // אם אין תרגיל פעיל, הצג הודעה
  if (!activeWorkout) {
    return (
      <div style={{ paddingTop: "4rem", textAlign: "center" }}>
        <p>No active workout selected.</p>
      </div>
    );
  }

  // עיצוב משודרג של טבלה
  return (
    <div style={{ paddingTop: "4rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>
        {activeWorkout.workoutName}
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Exercise</th>
            <th style={cellStyle}>Sets</th>
            <th style={cellStyle}>Reps</th>
            <th style={cellStyle}>Load (kg)</th>
            <th style={cellStyle}>RPE/RIR</th>
          </tr>
        </thead>
        <tbody>
          {activeWorkout.exercises?.map((ex, index) => (
            <tr
              key={index}
              style={index % 2 === 0 ? { backgroundColor: "#f9f9f9" } : {}}
            >
              <td style={cellStyle}>{ex.name}</td>
              <td style={cellStyle}>{ex.sets}</td>
              <td style={cellStyle}>{ex.reps}</td>
              <td style={cellStyle}>{ex.load}</td>
              <td style={cellStyle}>{ex.rpe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// סגנון תאים
const cellStyle = {
  textAlign: "center",
  padding: "0.75rem",
  border: "1px solid #ccc",
  fontSize: "1rem",
  fontWeight: "400"
};
