import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


const handleSubmit = async (e) => {
  e.preventDefault();

  const success = await login(email, password);

  if (success) {
    navigate("/dashboard");
  } else {
    setError("Invalid email or password");
  }
};

  return (
    <div style={{"flex": 1}}>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <button onClick={() => navigate("/register")} type="submit">Sign Up</button>
    </div>
  );
}