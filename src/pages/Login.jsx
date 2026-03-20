// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const success = await login(email, password);

//   if (success) {
//     navigate("/dashboard");
//   } else {
//     setError("Invalid email or password");
//   }
// };

//   return (
//     <div style={{"flex": 1}}>
//         <form onSubmit={handleSubmit}>
//             <h2>Login</h2>

//             <input
//                 placeholder="Email"
//                 onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//             />

//             <button type="submit">Login</button>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//         </form>
//         <button onClick={() => navigate("/register")} type="submit">Sign Up</button>
//     </div>
//   );
// }

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .auth-page {
    min-height: 100vh;
    background: #080b10;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
    position: relative;
    overflow: hidden;
  }

  .auth-page::before {
    content: '';
    position: absolute;
    top: -120px;
    left: -120px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .auth-page::after {
    content: '';
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0,119,255,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .auth-card {
    width: 100%;
    max-width: 440px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 48px 40px;
    position: relative;
    z-index: 1;
    animation: cardIn 0.5s ease both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
  }

  .auth-brand-dot {
    width: 10px;
    height: 10px;
    background: #00e5a0;
    border-radius: 50%;
    box-shadow: 0 0 12px #00e5a0;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 12px #00e5a0; }
    50%       { opacity: 0.5; box-shadow: 0 0 4px #00e5a0; }
  }

  .auth-brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #fff;
  }

  .auth-label {
    font-size: 11px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #00e5a0;
    margin-bottom: 10px;
  }

  .auth-title {
    font-family: 'Syne', sans-serif;
    font-size: 32px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 32px;
    line-height: 1.1;
  }

  .auth-title span { color: #00e5a0; }

  .field {
    margin-bottom: 16px;
    animation: fieldIn 0.4s ease both;
  }

  .field:nth-child(1) { animation-delay: 0.05s; }
  .field:nth-child(2) { animation-delay: 0.10s; }

  @keyframes fieldIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .field-label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #505870;
    margin-bottom: 8px;
  }

  .field-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .field-icon {
    position: absolute;
    left: 14px;
    width: 16px;
    height: 16px;
    color: #505870;
    pointer-events: none;
  }

  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 13px 14px 13px 40px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #e8eaf0;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .field-input::placeholder { color: #303850; }

  .field-input:focus {
    border-color: rgba(0,229,160,0.4);
    background: rgba(0,229,160,0.04);
    box-shadow: 0 0 0 3px rgba(0,229,160,0.08);
  }

  .field-input.error {
    border-color: rgba(255,80,100,0.45);
    background: rgba(255,80,100,0.04);
  }

  .error-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,80,100,0.08);
    border: 1px solid rgba(255,80,100,0.2);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 12px;
    color: #ff6b7a;
    margin-bottom: 20px;
    animation: cardIn 0.3s ease;
  }

  .submit-btn {
    width: 100%;
    margin-top: 8px;
    background: linear-gradient(135deg, #00e5a0, #00b87a);
    color: #080b10;
    border: none;
    border-radius: 10px;
    padding: 14px;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 0 24px rgba(0,229,160,0.25);
  }

  .submit-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 0 36px rgba(0,229,160,0.4);
  }

  .submit-btn:active { transform: translateY(0); }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.06);
    margin: 28px 0;
  }

  .auth-footer {
    text-align: center;
    font-size: 12px;
    color: #505870;
  }

  .auth-link-btn {
    color: #00e5a0;
    background: none;
    border: none;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s;
  }

  .auth-link-btn:hover { opacity: 0.7; }
`;

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">
        <div className="auth-card">

          <div className="auth-brand">
            <div className="auth-brand-dot" />
            <span className="auth-brand-name">Workmates</span>
          </div>

          {error && (
            <div className="error-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
              </svg>
              {error}
            </div>
          )}

          <div className="auth-label">Welcome back</div>
          <h1 className="auth-title">Sign in to<br /><span>Workmates</span></h1>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="field-label">Email</label>
              <div className="field-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  className={`field-input${error ? " error" : ""}`}
                  type="email"
                  placeholder="jane@company.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  className={`field-input${error ? " error" : ""}`}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  required
                />
              </div>
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <hr className="divider" />

          <div className="auth-footer">
            Don't have an account?{" "}
            <button className="auth-link-btn" onClick={() => navigate("/register")}>
              Create one
            </button>
          </div>

        </div>
      </div>
    </>
  );
}