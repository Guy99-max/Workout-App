import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddMetric() {
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [chest, setChest] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("You must be logged in");

    try {
      await addDoc(collection(db, "metrics"), {
        userId: user.uid,
        weight: Number(weight),
        waist: Number(waist),
        chest: Number(chest),
        date: serverTimestamp(),
      });

      alert("Metric added!");
      setWeight("");
      setWaist("");
      setChest("");
    } catch (err) {
      console.error("Error adding metric:", err);
      alert("Failed to add metric");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Add New Measurement</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Waist (cm)"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
        />
        <input
          type="number"
          placeholder="Chest (cm)"
          value={chest}
          onChange={(e) => setChest(e.target.value)}
        />
        <button
          type="submit"
          style={{
            width: "120px",  // או כל רוחב שתרצה
            alignSelf: "flex-start"  // מיישר אותו לשמאל (או ימין בשפה עברית)
          }}
        >
          Save
        </button>
      </form>

    </div>
  );
}
