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
    <div style={{ padding: "40px", backgroundColor: "#3c0d86ff", color: "white", maxWidth: "100%", margin: "40px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        New user?{" "}
        <button onClick={goToSignup} style={{ fontSize: "12px" }}>
          Signup here
        </button>
      </p>
    </div>
  );
}

export default Login;

