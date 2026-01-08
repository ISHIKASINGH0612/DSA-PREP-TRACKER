

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";


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

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  // ❌ user not logged in
  if (!user) {
    return showSignup ? (
      <Signup goToLogin={() => setShowSignup(false)} />
    ) : (
      <Login goToSignup={() => setShowSignup(true)} />
    );
  }

  // ✅ user logged in → ROUTES
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;




// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { auth } from "./firebase/firebaseConfig";

// import Signup from "./pages/signup.jsx";
// import Login from "./pages/login.jsx";
// import Dashboard from "./pages/dashboard.jsx";

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   if (loading) {
//     return <h2 style={{ padding: "40px" }}>Loading...</h2>;
//   }

//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route
//         path="/login"
//         element={!user ? <Login /> : <Navigate to="/" />}
//       />
//       <Route
//         path="/signup"
//         element={!user ? <Signup /> : <Navigate to="/" />}
//       />

//       {/* Protected route */}
//       <Route
//         path="/"
//         element={user ? <Dashboard /> : <Navigate to="/login" />}
//       />
//     </Routes>
//   );
// }

// export default App;
