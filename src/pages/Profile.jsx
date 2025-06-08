import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    weight: "",
    measurements: "",
    history: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, "profiles", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await setDoc(doc(db, "profiles", user.uid), profileData);
  };

  return (
    <div className="pt-16 px-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Profile</h2>
      <div className="mb-4">
        <label className="block mb-1">Weight (kg):</label>
        <input
          type="number"
          name="weight"
          value={profileData.weight}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Measurements:</label>
        <input
          type="text"
          name="measurements"
          value={profileData.measurements}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Workout History</h3>
        <ul className="list-disc list-inside">
          {profileData.history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
