// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase/firebaseConfig";

// function Login({ goToSignup }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("Login successful!");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     // <div style={{ padding: "40px", backgroundColor: "#3c0d86ff", color: "white", maxWidth: "100%", margin: "40px auto" }}>
//      <div >
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br /><br />

//         <button type="submit">Login</button>
//       </form>

//       <p style={{ marginTop: "10px" }}>
//         New user?{" "}
//         <button onClick={goToSignup} style={{ fontSize: "12px" }}>
//           Signup here
//         </button>
//       </p>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Login({ goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center mb-3">Login</h4>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          New user?{" "}
          <button
            className="btn btn-link p-0"
            onClick={goToSignup}
          >
            Signup here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;

