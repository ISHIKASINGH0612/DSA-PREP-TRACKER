import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function TeacherDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const snap = await getDocs(collection(db, "users"));
      const list = snap.docs
        .map(d => d.data())
        .filter(u => u.role === "student");
      setStudents(list);
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Teacher Dashboard</h2>

      {students.map((s, i) => (
        <div key={i}>
          {s.name} | Batch: {s.batch}
        </div>
      ))}
    </div>
  );
}

export default TeacherDashboard;
