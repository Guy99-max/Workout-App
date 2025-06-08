// src/pages/ViewWorkouts.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useWorkout } from "../context/WorkoutContext";

export default function ViewWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const { setActiveWorkout } = useWorkout();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "workouts"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWorkouts(list);
    };

    fetchWorkouts();
  }, []);

  const handleAddToHome = (workout) => {
    setActiveWorkout(workout);
  };

  const handleDelete = async (workoutId) => {
    const confirm = window.confirm("Are you sure you want to permanently delete this workout?");
    if (!confirm) return;

    await deleteDoc(doc(db, "workouts", workoutId));
    setWorkouts(workouts.filter((w) => w.id !== workoutId));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Workouts</h2>
      {workouts.map((workout) => (
        <div key={workout.id} style={{ marginBottom: "1.5rem", borderBottom: "1px solid #ccc" }}>
          <h4>{workout.workoutName}</h4>
          <button onClick={() => handleAddToHome(workout)} style={buttonStyle}>Add to Home</button>
          <button onClick={() => handleDelete(workout.id)} style={{ ...buttonStyle, marginLeft: "1rem" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const buttonStyle = {
  padding: "4px 12px",
  fontSize: "0.85rem",
  backgroundColor: "transparent",
  border: "1px solid #888",
  borderRadius: "6px",
  cursor: "pointer",
};
