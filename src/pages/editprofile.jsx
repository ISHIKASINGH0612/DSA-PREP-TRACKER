import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name);
        setBatch(data.batch);
        setPhotoURL(data.photoURL || "");
      }
    };

    loadData();
  }, []);

  const saveProfile = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      name,
      batch,
      photoURL,
    });

    alert("Profile updated");
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Edit Profile</h2>

      <p>Name</p>
      <input value={name} onChange={e => setName(e.target.value)} />

      <p>Batch</p>
      <input value={batch} onChange={e => setBatch(e.target.value)} />

      <p>Photo URL</p>
      <input value={photoURL} onChange={e => setPhotoURL(e.target.value)} />

      <br /><br />
      <button onClick={saveProfile}>Save</button>
    </div>
  );
}

export default EditProfile;
