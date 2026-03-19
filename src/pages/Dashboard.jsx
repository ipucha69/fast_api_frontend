import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  const fetchUsers = () => {
    API.get("/users")
    .then(res => setUsers(res.data))
    .catch(() => alert("Fetching workmates failed"))
  }

  return (
    <div>
      <div>Welcome {user?.email}</div>
      <button onClick={() => fetchUsers()}>View Workmates {users.length}</button>
    </div>
  )
}