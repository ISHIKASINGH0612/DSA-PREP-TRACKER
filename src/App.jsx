import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Entry from "./pages/entry";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  /* Loading state */
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h4>Loading...</h4>
      </div>
    );
  }

  /* Not logged in */
  if (!user) {
    if (!showSignup) {
      return (
        <Entry
          goToLogin={() => setShowSignup(false)}
          goToSignup={() => setShowSignup(true)}
        />
      );
    }

    return <Signup goToLogin={() => setShowSignup(false)} />;
  }

  /* Logged in → Dashboard */
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "./firebase/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// import Entry from "./pages/entry";
// import Login from "./pages/login";
// import Signup from "./pages/signup";
// import StudentDashboard from "./pages/studentdashboard";
// import TeacherDashboard from "./pages/teacherdashboard";

// function App() {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);

//       if (currentUser) {
//         const snap = await getDoc(doc(db, "users", currentUser.uid));
//         if (snap.exists()) {
//           setRole(snap.data().role);
//         }
//       }

//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   if (loading) return <h2>Loading...</h2>;

//   // NOT LOGGED IN
//   if (!user) {
//     if (!selectedRole) {
//       return <Entry chooseRole={setSelectedRole} />;
//     }

//     return (
//       <Signup role={selectedRole} />
//     );
//   }

//   // LOGGED IN
//   if (role === "teacher") return <TeacherDashboard />;
//   return <StudentDashboard />;
// }

// export default App;