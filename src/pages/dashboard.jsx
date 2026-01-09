
// import { useEffect, useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth, db } from "../firebase/firebaseConfig";
// import { useNavigate } from "react-router-dom";
// import { setDoc } from "firebase/firestore";
// import Leaderboard from "./leaderboard";

// import {
//   doc,
//   getDoc,
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where,
//   deleteDoc,
//   Timestamp
// } from "firebase/firestore";


// function Dashboard() {
//   const [userData, setUserData] = useState(null);
//   const [platform, setPlatform] = useState("");
//   const [question, setQuestion] = useState("");
//   const [solvedQuestions, setSolvedQuestions] = useState([]);
//   const [activePlatform, setActivePlatform] = useState(null);
//   const [leaderboard, setLeaderboard] = useState([]);
//   // const navigate = useNavigate();

  

// useEffect(() => {
//   const fetchData = async () => {
//     const user = auth.currentUser;
//     if (!user) return;

//     // 1️⃣ current user profile
//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);

//     if (!userSnap.exists()) return;

//     const currentUserData = userSnap.data();
//     setUserData(currentUserData);

//     // current user solved questions
// const q = query(
//   collection(db, "solvedQuestions"),
//   where("userId", "==", user.uid)
// );

// const qsnap = await getDocs(q);

// setSolvedQuestions(
//   qsnap.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }))
// );



//     // 2️⃣ fetch ALL users
//     const usersSnap = await getDocs(collection(db, "users"));
//     const users = usersSnap.docs.map(doc => ({
//       uid: doc.id,
//       ...doc.data()
//     }));

//     // 3️⃣ fetch ALL solved questions
//     const solvedSnap = await getDocs(collection(db, "solvedQuestions"));
//     const solved = solvedSnap.docs.map(doc => doc.data());

//     // 4️⃣ same batch users only
//     const batchUsers = users.filter(
//       u => u.batch === currentUserData.batch
//     );

//     // 5️⃣ build leaderboard
// const leaderboardData = batchUsers.map(u => {
//   const count = solved.filter(
//     q => q.userId === u.uid
//   ).length;

//   return {
//     name: u.name,
//     batch: u.batch,   // ⭐ YE LINE ADD KARO
//     solved: count
//   };
// });


//     // 6️⃣ sort + rank
//     leaderboardData.sort((a, b) => b.solved - a.solved);

//     const ranked = leaderboardData.map((u, i) => ({
//       rank: i + 1,
//       ...u
//     }));

//     setLeaderboard(ranked);
//     console.log("LEADERBOARD DATA 👉", leaderboard);
//   };

//   fetchData();
  

// }, []);


//   // Add solved question
//   const handleAddQuestion = async () => {
//     if (!platform || !question) {
//       alert("Please fill all fields");
//       return;
//     }

//     await addDoc(collection(db, "solvedQuestions"), {
//       userId: auth.currentUser.uid,
//       platform,
//       question,
//       createdAt: Timestamp.now(),
//     });

//     setPlatform("");
//     setQuestion("");

//     // refresh list
//     const q = query(
//       collection(db, "solvedQuestions"),
//       where("userId", "==", auth.currentUser.uid)
//     );
//     const qsnap = await getDocs(q);
//     setSolvedQuestions(qsnap.docs.map((doc) => doc.data()));
//   };

//   // counts
//   const leetcodeCount = solvedQuestions.filter(
//     (q) => q.platform === "leetcode"
//   ).length;
//   const gfgCount = solvedQuestions.filter(
//     (q) => q.platform === "gfg"
//   ).length;
//   const hackerrankCount = solvedQuestions.filter(
//     (q) => q.platform === "hackerrank"
//   ).length;
//   const totalCount = solvedQuestions.length;

//   // Update Photo URL
//   const updatePhotoURL = async (url) => {
//   if (!url) return;

//   try {
//     await setDoc(
//       doc(db, "users", auth.currentUser.uid),
//       { photoURL: url },
//       { merge: true }
//     );

//     setUserData(prev => ({ ...prev, photoURL: url }));
//   } catch (err) {
//     alert("Invalid image URL");
//   }
// };



//  const handleDeleteQuestion = async (id) => {
//   try {
//     await deleteDoc(doc(db, "solvedQuestions", id));

//     setSolvedQuestions(prev =>
//       prev.filter(q => q.id !== id)
//     );
//   } catch (error) {
//     alert(error.message);
//   }
// };


  

//   return (
//     // <div style={{ padding: "30px" }}>
//     <div >
//       {/* Header */}
//       <div
//         // style={{
//         //   display: "flex",
//         //   justifyContent: "space-between",
//         //   marginBottom: "30px",
//         //   backgroundColor: "#3c0d86ff",
//         //   color: "white",
//         //   padding: "20px",
//         //   borderRadius: "10px",
//         // }}
//       >
//         <div>
//           {userData ? (
//             <>
//               <h2>{userData.name}</h2>
//               <p>Batch: {userData.batch}</p>
//             </>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </div>

//         <div style={{ textAlign: "center" }}>
//          <img
//   src={
//     userData?.photoURL
//       ? userData.photoURL
//       : `https://api.dicebear.com/7.x/initials/svg?seed=${userData?.name}`
//   }
//   alt="profile"
//   // style={{
//   //   width: "80px",
//   //   height: "80px",
//   //   borderRadius: "50%",
//   //   objectFit: "cover"
//   // }}
// />

//           {/* <p style={{ fontSize: "12px" }}>Change Photo</p> */}
//           <p >Change Photo</p>

//           {/* <button style={{ color: "white", backgroundColor:"#2e0b67ff", border: "none", padding: "10px 20px", borderRadius: "5px" }} onClick={() => signOut(auth)}>Logout</button> */}
//           <button  onClick={() => signOut(auth)}>Logout</button>
//         </div>
//       </div>

//       {/* Platform Cards */}
//       {/* <div style={{ display: "flex", gap: "20px", backgroundColor: "#3c0d86ff", padding: "20px", color: "white", alignContent:"center"}}> */}
//       <div >
//         <PlatformCard
//           name="LeetCode"
//           count={leetcodeCount}
//           platformKey="leetcode"
//           activePlatform={activePlatform}
//           setActivePlatform={setActivePlatform}
//         />
//         <PlatformCard
//           name="GeeksforGeeks"
//           count={gfgCount}
//           platformKey="gfg"
//           activePlatform={activePlatform}
//           setActivePlatform={setActivePlatform}
//         />
//         <PlatformCard
//           name="HackerRank"
//           count={hackerrankCount}
//           platformKey="hackerrank"
//           activePlatform={activePlatform}
//           setActivePlatform={setActivePlatform}
//         />
//       </div>

//       {/* <h3 style={{ marginTop: "20px", backgroundColor: "#3c0d86ff", color: "white", padding: "10px" }}> */}
//         <h3>
//         Total Questions Solved: {totalCount}
//       </h3>

//       {activePlatform && (
//   <>
//     {/* <h3 style={{ marginTop: "30px", backgroundColor: "#3c0d86ff", color: "white", padding: "10px" }}> */}
//      <h3 >
//       {activePlatform.toUpperCase()} Questions
//     </h3>

//     {solvedQuestions
//       .filter(q => q.platform === activePlatform)
//       .map((q) => (
//         <SolvedCard
//           key={q.id}
//           question={q.question}
//           onDelete={() => handleDeleteQuestion(q.id)}
//         />
//       ))}
//   </>
// )}


//       {/* Add Question */}
//       {/* <h3 style={{ marginTop: "30px" , backgroundColor: "#3c0d86ff", color: "white", padding: "10px" }}>Add Solved Question</h3> */}
//        <h3 >Add Solved Question</h3>

//       {/* <select style={{ backgroundColor: "#3c0d86ff", color: "white", padding: "10px", borderRadius: "5px" }} */}
//       <select 
//         value={platform}
//         onChange={(e) => setPlatform(e.target.value)}
//       >
//         <option value="">Select Platform</option>
//         <option value="leetcode">LeetCode</option>
//         <option value="gfg">GeeksforGeeks</option>
//         <option value="hackerrank">HackerRank</option>
//       </select>

//       <br />
//       <br />

//       {/* <input style={{ backgroundColor: "#3c0d86ff", color: "white", padding: "10px", borderRadius: "5px" }} */}
//       <input 
//         type="text"
//         placeholder="Question Name"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />

//       <br />
//       <br />

//       {/* <button  style={{ backgroundColor: "#3c0d86ff", color: "white", padding: "10px", borderRadius: "5px" }} onClick={handleAddQuestion}>Add Question</button> */}
//       <button   onClick={handleAddQuestion}>Add Question</button>
//       <Leaderboard leaderboard={leaderboard} />
//     </div>
//   );
// }

// /* Platform Card */
// function PlatformCard({
//   name,
//   count,
//   platformKey,
//   activePlatform,
//   setActivePlatform,
// }) {
//   const isActive = activePlatform === platformKey;

//   return (
//     <div
//       // style={{
//       //   border: "1px solid #ccc",
//       //   padding: "20px",
//       //   borderRadius: "10px",
//       //   width: "180px",
//       //   textAlign: "center",
//       //   backgroundColor: "#3c0d86ff", 
//       //   color: "white"
//       // }}
//     >
//       <h4>{name}</h4>
//       <p>{count} solved</p>

//       {count > 0 && (
//         <button
//           onClick={() =>
//             setActivePlatform(isActive ? null : platformKey)
//           }
//         >
//           {isActive ? "Hide" : "Show"}
//         </button>
//       )}
//     </div>
//   );
// }

// /* Solved Question Card */
// function SolvedCard({ question, onDelete }) {
//   return (
//     <div
//       // style={{
//       //   border: "1px solid #ddd",
//       //   padding: "12px",
//       //   borderRadius: "8px",
//       //   marginBottom: "10px",
//       //   display: "flex",
//       //   justifyContent: "space-between",
//       //   alignItems: "center",
//       //   backgroundColor: "#3c0d86ff",
//       //    color: "white"
//       // }}
//     >
//       <span>{question}</span>

//       <button
//         onClick={onDelete}
//         // style={{
//         //   background: "red",
//         //   color: "white",
//         //   border: "none",
//         //   padding: "4px 8px",
//         //   cursor: "pointer",

//         // }}
//       >
//         ❌
//       </button>
//     </div>
  
// );
// }






// export default Dashboard;

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
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
  Timestamp,
} from "firebase/firestore";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [platform, setPlatform] = useState("");
  const [question, setQuestion] = useState("");
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [activePlatform, setActivePlatform] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;

      const currentUserData = userSnap.data();
      setUserData(currentUserData);

      const q = query(
        collection(db, "solvedQuestions"),
        where("userId", "==", user.uid)
      );
      const qsnap = await getDocs(q);
      setSolvedQuestions(
        qsnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      const usersSnap = await getDocs(collection(db, "users"));
      const users = usersSnap.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      const solvedSnap = await getDocs(collection(db, "solvedQuestions"));
      const solved = solvedSnap.docs.map((doc) => doc.data());

      const batchUsers = users.filter(
        (u) => u.batch === currentUserData.batch
      );

      const leaderboardData = batchUsers.map((u) => ({
        name: u.name,
        batch: u.batch,
        solved: solved.filter((q) => q.userId === u.uid).length,
      }));

      leaderboardData.sort((a, b) => b.solved - a.solved);
      setLeaderboard(
        leaderboardData.map((u, i) => ({ rank: i + 1, ...u }))
      );
    };

    fetchData();
  }, []);

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

    const q = query(
      collection(db, "solvedQuestions"),
      where("userId", "==", auth.currentUser.uid)
    );
    const qsnap = await getDocs(q);
    setSolvedQuestions(
      qsnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const handleDeleteQuestion = async (id) => {
    await deleteDoc(doc(db, "solvedQuestions", id));
    setSolvedQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const leetcodeCount = solvedQuestions.filter(
    (q) => q.platform === "leetcode"
  ).length;
  const gfgCount = solvedQuestions.filter((q) => q.platform === "gfg").length;
  const hackerrankCount = solvedQuestions.filter(
    (q) => q.platform === "hackerrank"
  ).length;
  const totalCount = solvedQuestions.length;

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">{userData?.name}</h4>
            <small className="text-muted">
              Batch: {userData?.batch}
            </small>
          </div>

          <div className="text-center">
            <img
              src={
                userData?.photoURL
                  ? userData.photoURL
                  : `https://api.dicebear.com/7.x/initials/svg?seed=${userData?.name}`
              }
              alt="profile"
              className="rounded-circle mb-2"
              width="70"
              height="70"
            />
            <br />
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => signOut(auth)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="row mb-4">
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

      <h5>Total Questions Solved: {totalCount}</h5>

      {activePlatform && (
        <>
          <h5 className="mt-4">
            {activePlatform.toUpperCase()} Questions
          </h5>
          {solvedQuestions
            .filter((q) => q.platform === activePlatform)
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
      <div className="card mt-4">
        <div className="card-body">
          <h5>Add Solved Question</h5>

          <select
            className="form-select mb-3"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">Select Platform</option>
            <option value="leetcode">LeetCode</option>
            <option value="gfg">GeeksforGeeks</option>
            <option value="hackerrank">HackerRank</option>
          </select>

          <input
            className="form-control mb-3"
            type="text"
            placeholder="Question Name"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button className="btn btn-primary" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
      </div>

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
    <div className="col-md-4 mb-3">
      <div className="card text-center h-100">
        <div className="card-body">
          <h6>{name}</h6>
          <p>{count} solved</p>
          {count > 0 && (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() =>
                setActivePlatform(isActive ? null : platformKey)
              }
            >
              {isActive ? "Hide" : "Show"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Solved Question Card */
function SolvedCard({ question, onDelete }) {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between align-items-center">
        <span>{question}</span>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          ❌
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
