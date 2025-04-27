import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RatingChart({ ratingData }) {
  const formattedData = ratingData.map((entry, index) => ({
    name: entry.contestName,
    rating: entry.newRating,
    round: `${index + 1}`,
  }));

  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Rating Progression
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="round" tick={{ fontSize: 12 }} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
