import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function Signup() {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        batch: batch,
        email: email,
        createdAt: new Date(),
      });

      alert("Signup & profile saved!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#3c0d86ff", color: "white", maxWidth: "400px", margin: "40px auto" }}>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Batch (e.g. 2025)"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          required
        />
        <br /><br />

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;


