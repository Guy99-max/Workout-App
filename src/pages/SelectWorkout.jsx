import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SelectWorkout() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

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

  const handleSelect = async (workout) => {
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, "activeWorkouts", user.uid), {
      userId: user.uid,
      workoutName: workout.workoutName,
      exercises: workout.exercises,
      updatedAt: new Date()
    });

    navigate("/");
  };

  return (
    <div style={{ paddingTop: "4rem" }}>
      <h2>Select a Workout</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul>
          {workouts.map((w) => (
            <li key={w.id} style={{ marginBottom: "1rem" }}>
              <strong>{w.workoutName}</strong>
              <button style={{ marginLeft: "1rem" }} onClick={() => handleSelect(w)}>
                Add to Home
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
