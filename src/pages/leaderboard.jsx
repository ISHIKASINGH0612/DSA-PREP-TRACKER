// // function Leaderboard({ leaderboard }) {
// //   return (
// //     <div style={{ marginTop: "40px" }}>
// //       <h2>🏆 Leaderboard</h2>

// //       <table style={{
// //         width: "100%",
// //         borderCollapse: "collapse",
// //         marginTop: "20px"
// //       }}>
// //         <thead>
// //           <tr>
// //             <th>Rank</th>
// //             <th>Name</th>
// //             <th>Batch</th>
// //             <th>Solved</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {leaderboard.map((u) => (
// //             <tr key={u.userId}>
// //               <td>
// //                 {u.rank === 1 ? "🥇" : u.rank === 2 ? "🥈" : u.rank === 3 ? "🥉" : u.rank}
// //               </td>
// //               <td>{u.name}</td>
// //               <td>{u.batch}</td>
// //               <td>{u.solved}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default Leaderboard;

// function Leaderboard({ leaderboard }) {
//   if (!leaderboard.length) return null;

//   return (
//     <div style={{ marginTop: "50px" }}>
//       <h2>🏆 Leaderboard</h2>

//       <table style={{ width: "100%", marginTop: "10px" }}>
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Name</th>
//             <th>Batch</th>
//             <th>Solved</th>
//           </tr>
//         </thead>

//         <tbody>
//           {leaderboard.map((u) => (
//             <tr key={u.rank}>
//               <td>{u.rank}</td>
//               <td>{u.name}</td>
//               <td>{u.batch}</td>
//               <td>{u.solved}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Leaderboard;

function Leaderboard({ leaderboard }) {
  if (!leaderboard || leaderboard.length === 0) return null;

  return (
    <div style={{ marginTop: "50px" }}>
      <h2>🏆 Leaderboard</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <th style={th}>Rank</th>
            <th style={th}>Name</th>
            <th style={th}>Batch</th>
            <th style={th}>Solved</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((u) => (
            <tr key={u.rank} style={{ borderBottom: "1px solid #333" }}>
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


