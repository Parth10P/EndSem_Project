import React from "react";
import CodeTrackr from "./components/code";
import RatingStatsTable from "./components/RatingStats";
import UserProblemStats from "./components/UserProblemStats";

const App = () => {
  return (
    <div>
      <CodeTrackr />
      <UserProblemStats />
      <RatingStatsTable />
    </div>
  );
};

export default App;
