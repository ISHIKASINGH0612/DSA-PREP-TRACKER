import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      
      <div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px"
}}>
  {/* Left: Name + Batch */}
  <div>
    <h2>Ishika Singh</h2>
    <p>Batch: 2025</p>
  </div>

  {/* Right: Profile + Logout */}
  <div style={{ textAlign: "center" }}>
    <img
      src="https://via.placeholder.com/80"
      alt="profile"
      style={{ borderRadius: "50%" }}
    />
    <p style={{ fontSize: "12px" }}>Change Photo</p>

    <button
      onClick={() => signOut(auth)}
      style={{
        marginTop: "8px",
        padding: "5px 10px",
        fontSize: "12px",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  </div>
</div>


      {/* Platform Cards */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px"
      }}>
        <PlatformCard name="LeetCode" count={0} />
        <PlatformCard name="GeeksforGeeks" count={0} />
        <PlatformCard name="HackerRank" count={0} />
      </div>

      {/* Total */}
      <h3>Total Questions Solved: 0</h3>

      {/* Solved Questions */}
      <h3 style={{ marginTop: "30px" }}>Solved Questions</h3>

      <SolvedCard platform="LeetCode" question="Two Sum" />
      <SolvedCard platform="GFG" question="Binary Search" />
      <SolvedCard platform="HackerRank" question="Arrays Intro" />

      {/* Add Button */}
      <button style={{ marginTop: "20px" }}>
        + Add Solved Question
      </button>
    </div>
  );
}

/* Platform Summary Card */
function PlatformCard({ name, count }) {
  return (
    <div style={{
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      width: "150px",
      textAlign: "center"
    }}>
      <h4>{name}</h4>
      <p>{count} solved</p>
    </div>
  );
}

/* Solved Question Card */
function SolvedCard({ platform, question }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "10px"
    }}>
      <strong>{platform}</strong>
      <p>{question}</p>
    </div>
  );
}

export default Dashboard;
