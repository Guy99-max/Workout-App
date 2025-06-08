import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function MyWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    workoutName: "",
    exercises: [],
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "workouts"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  const handleAddWorkout = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = await addDoc(collection(db, "workouts"), {
      ...newWorkout,
      userId: user.uid,
    });

    setWorkouts([...workouts, { id: docRef.id, ...newWorkout }]);
    setNewWorkout({ workoutName: "", exercises: [] });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "workouts", id));
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  return (
    <div className="pt-16 px-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">My Workouts</h2>
      <div className="mb-4">
        <label className="block mb-1">Workout Name:</label>
        <input
          type="text"
          value={newWorkout.workoutName}
          onChange={(e) =>
            setNewWorkout({ ...newWorkout, workoutName: e.target.value })
          }
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <button
        onClick={handleAddWorkout}
        className="bg-green-500 text-white px-4 py-2 rounded mb-6"
      >
        Add Workout
      </button>
      <ul className="space-y-4">
        {workouts.map((workout) => (
          <li
            key={workout.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <span>{workout.workoutName}</span>
            <button
              onClick={() => handleDelete(workout.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
