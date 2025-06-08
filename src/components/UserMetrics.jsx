import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function UserMetrics() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("No user logged in");
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "metrics"),
        where("userId", "==", user.uid),
        orderBy("date", "desc")
      );

      const unsubscribeData = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched metrics:", data);
        setMetrics(data);
        setLoading(false);
      });

      return () => unsubscribeData();
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3>Previous Measurements</h3>
      {metrics.length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight</th>
              <th>Waist</th>
              <th>Chest</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.id}>
                <td>{metric.date?.toDate().toLocaleDateString() || "—"}</td>
                <td>{!isNaN(metric.weight) ? metric.weight : "—"}</td>
                <td>{!isNaN(metric.waist) ? metric.waist : "—"}</td>
                <td>{!isNaN(metric.chest) ? metric.chest : "—"}</td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}
