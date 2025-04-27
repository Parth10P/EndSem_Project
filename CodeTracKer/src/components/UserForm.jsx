import React, { useState } from "react";
import "./UserForm.css"; // Import custom CSS for additional styling

export default function UserForm({ setUserData }) {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError("");

      const [infoRes, ratingRes, statusRes] = await Promise.all([
        fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
        fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
        fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`),
      ]);

      const infoData = await infoRes.json();
      const ratingData = await ratingRes.json();
      const statusData = await statusRes.json();

      if (
        infoData.status !== "OK" ||
        ratingData.status !== "OK" ||
        statusData.status !== "OK"
      ) {
        throw new Error("Invalid handle or network error");
      }

      const userInfo = infoData.result[0];
      const ratingChanges = ratingData.result;
      const submissions = statusData.result;

      setUserData({ userInfo, ratingChanges });
      setRecentSubmissions(submissions);
    } catch (err) {
      setError("Failed to fetch data. Please check the handle.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handle.trim()) {
      fetchUserData();
    }
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Enter Codeforces Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="user-input"
        />
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Track"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
      
      {/* Display recent submissions */}
      {recentSubmissions.length > 0 && (
        <div className="submissions-container">
          <h2 className="submissions-title">Recent Submissions</h2>
          <table className="submissions-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Problem</th>
                <th>Index</th>
                <th>Verdict</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map((submission, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{submission.problem.name}</td>
                  <td>{submission.problem.index}</td>
                  <td className={submission.verdict === "OK" ? "text-green" : "text-red"}>
                    {submission.verdict}
                  </td>
                  <td>{submission.programmingLanguage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}