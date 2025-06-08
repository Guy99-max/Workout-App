// src/pages/CreateWorkout.js
import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateWorkout() {
  const [workoutName, setWorkoutName] = useState("Workout A");
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    load: "",
    rpe: "",
  });

  const handleAddExercise = () => {
    if (!newExercise.name) return;
    setExercises([...exercises, newExercise]);
    setNewExercise({ name: "", sets: "", reps: "", load: "", rpe: "" });
  };

  const handleSaveWorkout = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return alert("You must be logged in");

      await addDoc(collection(db, "workouts"), {
        userId: user.uid,
        workoutName,
        exercises,
        createdAt: serverTimestamp(),
      });

      alert("Workout saved!");
      setExercises([]);
      setWorkoutName("Workout A");
    } catch (err) {
      console.error("Error saving workout:", err);
      alert("Failed to save workout");
    }
  };

  return (
    <div className="main-content">
      <h2 style={{ marginBottom: "1rem" }}>Create a Workout</h2>

      <input
        placeholder="Workout Name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        style={{ width: "100%" }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <input
          placeholder="Exercise"
          value={newExercise.name}
          onChange={(e) =>
            setNewExercise({ ...newExercise, name: e.target.value })
          }
        />
        <input
          placeholder="Sets"
          type="number"
          value={newExercise.sets}
          onChange={(e) =>
            setNewExercise({ ...newExercise, sets: e.target.value })
          }
        />
        <input
          placeholder="Reps"
          type="number"
          value={newExercise.reps}
          onChange={(e) =>
            setNewExercise({ ...newExercise, reps: e.target.value })
          }
        />
        <input
          placeholder="Load (kg)"
          type="number"
          value={newExercise.load}
          onChange={(e) =>
            setNewExercise({ ...newExercise, load: e.target.value })
          }
        />
        <input
          placeholder="RPE / RIR"
          value={newExercise.rpe}
          onChange={(e) =>
            setNewExercise({ ...newExercise, rpe: e.target.value })
          }
        />
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button onClick={handleAddExercise}>Add Exercise</button>
        <button onClick={handleSaveWorkout}>Save Workout</button>
      </div>

      {exercises.length > 0 && (
        <>
          <h3 style={{ marginTop: "2rem" }}>Exercises</h3>
          <table>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Load</th>
                <th>RPE/RIR</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((ex, idx) => (
                <tr key={idx}>
                  <td>{ex.name}</td>
                  <td>{ex.sets}</td>
                  <td>{ex.reps}</td>
                  <td>{ex.load}</td>
                  <td>{ex.rpe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
