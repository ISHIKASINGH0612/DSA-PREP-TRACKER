

// // import { createUserWithEmailAndPassword } from "firebase/auth";
// // import { auth, db } from "../firebase/firebaseConfig";
// // import { doc, setDoc } from "firebase/firestore";
// // import { useState } from "react";

// // function Signup({ role }) {
// //   const [name, setName] = useState("");
// //   const [batch, setBatch] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSignup = async () => {
// //     const cred = await createUserWithEmailAndPassword(auth, email, password);

// //     await setDoc(doc(db, "users", cred.user.uid), {
// //       name,
// //       batch,
// //       email,
// //       role, // ⭐ VERY IMPORTANT
// //     });
// //   };

// //   return (
// //     <div>
// //       <h2>Signup ({role})</h2>

// //       <input placeholder="Name" onChange={e => setName(e.target.value)} />
// //       <input placeholder="Batch" onChange={e => setBatch(e.target.value)} />
// //       <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
// //       <input placeholder="Password" type="password"
// //         onChange={e => setPassword(e.target.value)} />

// //       <button onClick={handleSignup}>Signup</button>
// //     </div>
// //   );
// // }

// // export default Signup;



// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebase/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { useState } from "react";

// function Signup({ role }) {
//   const [name, setName] = useState("");
//   const [batch, setBatch] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     const cred = await createUserWithEmailAndPassword(auth, email, password);

//     await setDoc(doc(db, "users", cred.user.uid), {
//       name,
//       batch,
//       email,
//       role, // ⭐ VERY IMPORTANT
//     });
//   };

//   return (
//     <div>
//       <h2>Signup ({role})</h2>

//       <input placeholder="Name" onChange={e => setName(e.target.value)} />
//       <input placeholder="Batch" onChange={e => setBatch(e.target.value)} />
//       <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password"
//         onChange={e => setPassword(e.target.value)} />

//       <button onClick={handleSignup}>Signup</button>
//     </div>
//   );
// }

// export default Signup;


import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

function Signup({ goToLogin }) {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !batch || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        batch,
        email,
      });

      alert("Signup successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Batch"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSignup}>Signup</button>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={goToLogin}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
