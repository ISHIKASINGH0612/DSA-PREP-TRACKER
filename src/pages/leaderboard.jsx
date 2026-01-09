

function Leaderboard({ leaderboard }) {
  if (!leaderboard || leaderboard.length === 0) return null;

  return (
    // <div style={{ marginTop: "50px", backgroundColor: "#3c0d86ff", padding: "20px", borderRadius: "10px", color: "white" }}>
     <div >
      <h2>🏆 Leaderboard</h2>

      <table
        // style={{
        //   width: "100%",
        //   borderCollapse: "collapse",
        //   marginTop: "20px",
        // }}
      >
        <thead>
          {/* <tr style={{ borderBottom: "1px solid white" }}> */}
            <tr >
            <th style={th}>Rank</th>
            <th style={th}>Name</th>
            <th style={th}>Batch</th>
            <th style={th}>Solved</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((u) => (
            <tr key={u.rank} style={{ borderBottom: "1px solid white" }}>
              <td style={td}>
                {u.rank === 1 ? "🥇" : u.rank === 2 ? "🥈" : u.rank === 3 ? "🥉" : u.rank}
              </td>
              <td style={td}>{u.name}</td>
              <td style={td}>{u.batch}</td>
              <td style={td}>{u.solved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "12px",
  fontWeight: "bold",
};

const td = {
  padding: "12px",
};

export default Leaderboard;


