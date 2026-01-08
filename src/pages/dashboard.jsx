
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { setDoc } from "firebase/firestore";
import Leaderboard from "./leaderboard";

import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  Timestamp
} from "firebase/firestore";


function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [platform, setPlatform] = useState("");
  const [question, setQuestion] = useState("");
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [activePlatform, setActivePlatform] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  // const navigate = useNavigate();

  

useEffect(() => {
  const fetchData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    // 1️⃣ current user profile
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const currentUserData = userSnap.data();
    setUserData(currentUserData);

    // current user solved questions
const q = query(
  collection(db, "solvedQuestions"),
  where("userId", "==", user.uid)
);

const qsnap = await getDocs(q);

setSolvedQuestions(
  qsnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
);



    // 2️⃣ fetch ALL users
    const usersSnap = await getDocs(collection(db, "users"));
    const users = usersSnap.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    }));

    // 3️⃣ fetch ALL solved questions
    const solvedSnap = await getDocs(collection(db, "solvedQuestions"));
    const solved = solvedSnap.docs.map(doc => doc.data());

    // 4️⃣ same batch users only
    const batchUsers = users.filter(
      u => u.batch === currentUserData.batch
    );

    // 5️⃣ build leaderboard
const leaderboardData = batchUsers.map(u => {
  const count = solved.filter(
    q => q.userId === u.uid
  ).length;

  return {
    name: u.name,
    batch: u.batch,   // ⭐ YE LINE ADD KARO
    solved: count
  };
});


    // 6️⃣ sort + rank
    leaderboardData.sort((a, b) => b.solved - a.solved);

    const ranked = leaderboardData.map((u, i) => ({
      rank: i + 1,
      ...u
    }));

    setLeaderboard(ranked);
    console.log("LEADERBOARD DATA 👉", leaderboard);
  };

  fetchData();
  

}, []);


  // Add solved question
  const handleAddQuestion = async () => {
    if (!platform || !question) {
      alert("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "solvedQuestions"), {
      userId: auth.currentUser.uid,
      platform,
      question,
      createdAt: Timestamp.now(),
    });

    setPlatform("");
    setQuestion("");

    // refresh list
    const q = query(
      collection(db, "solvedQuestions"),
      where("userId", "==", auth.currentUser.uid)
    );
    const qsnap = await getDocs(q);
    setSolvedQuestions(qsnap.docs.map((doc) => doc.data()));
  };

  // counts
  const leetcodeCount = solvedQuestions.filter(
    (q) => q.platform === "leetcode"
  ).length;
  const gfgCount = solvedQuestions.filter(
    (q) => q.platform === "gfg"
  ).length;
  const hackerrankCount = solvedQuestions.filter(
    (q) => q.platform === "hackerrank"
  ).length;
  const totalCount = solvedQuestions.length;

  // Update Photo URL
  const updatePhotoURL = async (url) => {
  if (!url) return;

  try {
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { photoURL: url },
      { merge: true }
    );

    setUserData(prev => ({ ...prev, photoURL: url }));
  } catch (err) {
    alert("Invalid image URL");
  }
};



 const handleDeleteQuestion = async (id) => {
  try {
    await deleteDoc(doc(db, "solvedQuestions", id));

    setSolvedQuestions(prev =>
      prev.filter(q => q.id !== id)
    );
  } catch (error) {
    alert(error.message);
  }
};


  

  return (
    <div style={{ padding: "30px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div>
          {userData ? (
            <>
              <h2>{userData.name}</h2>
              <p>Batch: {userData.batch}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
         <img
  src={
    userData?.photoURL
      ? userData.photoURL
      : `https://api.dicebear.com/7.x/initials/svg?seed=${userData?.name}`
  }
  alt="profile"
  style={{
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover"
  }}
/>

          <p style={{ fontSize: "12px" }}>Change Photo</p>
     
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </div>

      {/* Platform Cards */}
      <div style={{ display: "flex", gap: "20px" }}>
        <PlatformCard
          name="LeetCode"
          count={leetcodeCount}
          platformKey="leetcode"
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
        />
        <PlatformCard
          name="GeeksforGeeks"
          count={gfgCount}
          platformKey="gfg"
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
        />
        <PlatformCard
          name="HackerRank"
          count={hackerrankCount}
          platformKey="hackerrank"
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
        />
      </div>

      <h3 style={{ marginTop: "20px" }}>
        Total Questions Solved: {totalCount}
      </h3>

      {activePlatform && (
  <>
    <h3 style={{ marginTop: "30px" }}>
      {activePlatform.toUpperCase()} Questions
    </h3>

    {solvedQuestions
      .filter(q => q.platform === activePlatform)
      .map((q) => (
        <SolvedCard
          key={q.id}
          question={q.question}
          onDelete={() => handleDeleteQuestion(q.id)}
        />
      ))}
  </>
)}


      {/* Add Question */}
      <h3 style={{ marginTop: "30px" }}>Add Solved Question</h3>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="">Select Platform</option>
        <option value="leetcode">LeetCode</option>
        <option value="gfg">GeeksforGeeks</option>
        <option value="hackerrank">HackerRank</option>
      </select>

      <br />
      <br />

      <input
        type="text"
        placeholder="Question Name"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAddQuestion}>Add Question</button>
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}

/* Platform Card */
function PlatformCard({
  name,
  count,
  platformKey,
  activePlatform,
  setActivePlatform,
}) {
  const isActive = activePlatform === platformKey;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        width: "180px",
        textAlign: "center",
      }}
    >
      <h4>{name}</h4>
      <p>{count} solved</p>

      {count > 0 && (
        <button
          onClick={() =>
            setActivePlatform(isActive ? null : platformKey)
          }
        >
          {isActive ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
}

/* Solved Question Card */
function SolvedCard({ question, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{question}</span>

      <button
        onClick={onDelete}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "4px 8px",
          cursor: "pointer",
        }}
      >
        ❌
      </button>
    </div>
  
);
}






export default Dashboard;
