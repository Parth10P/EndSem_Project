// RatingGraph.jsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RatingGraph() {
  const [handle, setHandle] = useState("");
  const [ratingData, setRatingData] = useState([]);
  const [error, setError] = useState("");

  const fetchRating = async () => {
    if (!handle) {
      setError("Please enter a handle");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        `https://codeforces.com/api/user.rating?handle=${handle}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const formattedData = data.result.map((item) => ({
          name: new Date(item.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
          rating: item.newRating,
          contestName: item.contestName,
        }));
        setRatingData(formattedData);
      } else {
        setError("User not found or API error");
        setRatingData([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch rating data");
      setRatingData([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Codeforces Rating Graph</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Enter Codeforces handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <button
          onClick={fetchRating}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Fetch Graph
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {ratingData.length > 0 && (
        <div className="w-full h-96 max-w-4xl bg-white p-4 shadow rounded">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                formatter={(value, name, props) => [`Rating: ${value}`, `Date`]}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
