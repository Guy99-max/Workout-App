// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function Home() {
  const { activeWorkout, setActiveWorkout } = useWorkout();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "workouts"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  const handleSelect = (workout) => {
    setActiveWorkout(workout);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this workout?");
    if (!confirm) return;

    await deleteDoc(doc(db, "workouts", id));
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="pt-16 px-4">
      <h2 className="text-center text-xl font-bold mb-4">My Workout Plan</h2>
      {workouts.length === 0 ? (
        <p className="text-center text-gray-500">No workouts added yet.</p>
      ) : (
        workouts.map((workout) => (
          <div
            key={workout.id}
            className="mb-6 p-4 rounded-xl shadow-md bg-white max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-semibold text-center mb-2">
              {workout.workoutName}
            </h3>
            <table className="w-full text-sm border">
              <thead>
                <tr>
                  <th className="border px-2 py-1 text-center">Exercise</th>
                  <th className="border px-2 py-1 text-center">Sets</th>
                  <th className="border px-2 py-1 text-center">Reps</th>
                  <th className="border px-2 py-1 text-center">Load (kg)</th>
                  <th className="border px-2 py-1 text-center">RPE/RIR</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(workout.exercises) && workout.exercises.length > 0 ? (
                  workout.exercises.map((ex, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1 text-center">{ex.name}</td>
                      <td className="border px-2 py-1 text-center">{ex.sets}</td>
                      <td className="border px-2 py-1 text-center">{ex.reps}</td>
                      <td className="border px-2 py-1 text-center">{ex.load}</td>
                      <td className="border px-2 py-1 text-center">{ex.rpe}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-400 py-2">
                      No exercises defined
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={() => handleSelect(workout)}
                className="text-sm px-3 py-1 border rounded-md hover:bg-gray-100"
              >
                Select Workout
              </button>
              <button
                onClick={() => handleDelete(workout.id)}
                className="text-sm px-3 py-1 border rounded-md hover:bg-red-100 text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
