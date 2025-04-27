import React from "react";

export default function UserStats({ userInfo }) {
  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">User Information</h2>
      <p><strong>Handle:</strong> {userInfo.handle}</p>
      <p><strong>Rank:</strong> {userInfo.rank}</p>
      <p><strong>Rating:</strong> {userInfo.rating}</p>
      <p><strong>Max Rating:</strong> {userInfo.maxRating}</p>
    </div>
  );
}