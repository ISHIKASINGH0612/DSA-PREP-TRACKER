

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

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  if (!user) {
  if (!showSignup) {
    return (
      <Entry
        goToLogin={() => setShowSignup(false)}
        goToSignup={() => setShowSignup(true)}
      />
    );
  }

  return (
    <Signup goToLogin={() => setShowSignup(false)} />
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




