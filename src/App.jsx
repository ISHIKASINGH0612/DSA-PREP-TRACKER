

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
// import EditProfile from "./pages/editprofile";


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
      {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
    </Routes>
  );
}

export default App;
