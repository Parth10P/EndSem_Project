import React, { useState } from "react";
import UserStats from "./components/UserStats.jsx";
import UserForm from "./components/UserForm.jsx";
import RatingChart from "./components/RatingChart.jsx";
import ContestPerformance from "./components/ContestPerformance.jsx";
import "./App.css";

export default function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">CodeTrackr</h1>

      <UserForm setUserData={setUserData} />

      {userData && (
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          {/* Left Section: Recent Submissions */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Recent Submissions
            </h2>
            {/* You can add recent submissions table here later */}
          </div>

          {/* Right Section: User Info, Rating Chart, Contest Performance */}
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            <UserStats userInfo={userData.userInfo} />
            <RatingChart ratingData={userData.ratingChanges} />
            <ContestPerformance contests={userData.ratingChanges} />
          </div>
        </div>
      )}
    </div>
  );
}


















// import React, { useState } from "react";
// import UserStats from "./components/UserStats.jsx";
// import UserForm from "./components/UserForm.jsx";
// import RatingChart from "./components/RatingChart.jsx";
// import ContestPerformance from "./components/ContestPerformance.jsx";
// import "./App.css";
// import RatingGraph from "./components/RatingChart.jsx";

// export default function App() {
//   const [userData, setUserData] = useState(null);
//   const [friendsList, setFriendsList] = useState([]); // ✅ New state

//   const addFriend = (friend) => {
//     setFriendsList([...friendsList, friend]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">CodeTrackr</h1>
//       <RatingGraph />

//       <UserForm setUserData={setUserData} />

//       <FriendForm addFriend={addFriend} /> {/* ✅ Add friend form */}

//       {userData && (
//         <div className="flex flex-col lg:flex-row mt-6 gap-6">
//           {/* Left Section */}
//           <div className="flex-1">
//             <h2 className="text-xl font-semibold mb-4 text-center">
//               Recent Submissions
//             </h2>
//             {/* Recent submissions here */}
//           </div>

//           {/* Right Section */}
//           <div className="flex flex-col gap-6 w-full lg:w-1/3">
//             <UserStats userInfo={userData.userInfo} />
//             <RatingChart ratingData={userData.ratingChanges} />
//             <ContestPerformance contests={userData.ratingChanges} />
//             <FriendsLeaderboard friends={friendsList} /> {/* ✅ Show dynamic friends */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
