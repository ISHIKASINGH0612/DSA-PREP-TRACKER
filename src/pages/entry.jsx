
function Entry({ goToLogin, goToSignup }) {
  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      
      {/* Top Right Buttons */}
      <div className="d-flex justify-content-end p-3 gap-2">
        <button className="btn btn-outline-primary" onClick={goToLogin}>
          Login
        </button>
        <button className="btn btn-primary" onClick={goToSignup}>
          Signup
        </button>
      </div>

      {/* Center Title */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <h1 className="fw-bold display-3 text-center">
          DSA PREP TRACKER
        </h1>
      </div>

    </div>
  );
}

export default Entry;


// function Entry({ chooseRole }) {
//   return (
//     <div className="h-screen flex flex-col">
      
//       {/* Center */}
//       <div className="flex-1 flex flex-col items-center justify-center gap-6">
//         <h1 className="text-5xl font-bold">DSA PREP TRACKER</h1>

//         <div className="flex gap-4">
//           <button
//             onClick={() => chooseRole("student")}
//             className="px-6 py-2 border rounded"
//           >
//             Student
//           </button>

//           <button
//             onClick={() => chooseRole("teacher")}
//             className="px-6 py-2 border rounded"
//           >
//             Teacher
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default Entry;
