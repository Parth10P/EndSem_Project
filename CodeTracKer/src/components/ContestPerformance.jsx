import React from "react";

export default function ContestPerformance({ contests }) {
  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Contest Performance</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Contest</th>
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Old Rating</th>
              <th className="py-2 px-4">New Rating</th>
              <th className="py-2 px-4">Change</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{contest.name}</td>
                <td className="py-2 px-4">{contest.rank}</td>
                <td className="py-2 px-4">{contest.oldRating}</td>
                <td className="py-2 px-4">{contest.newRating}</td>
                <td
                  className="py-2 px-4 font-semibold"
                  style={{ color: contest.newRating - contest.oldRating >= 0 ? 'green' : 'red' }}
                >
                  {contest.newRating - contest.oldRating >= 0 ? `+${contest.newRating - contest.oldRating}` : contest.newRating - contest.oldRating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
