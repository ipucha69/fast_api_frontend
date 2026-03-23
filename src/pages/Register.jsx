
import { useState } from "react";
import API from "../services/api";
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

  /* background glow blobs */
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
  .field:nth-child(3) { animation-delay: 0.15s; }

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
    flex-shrink: 0;
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

  .auth-footer {
    margin-top: 28px;
    text-align: center;
    font-size: 12px;
    color: #505870;
  }

  .auth-footer a, .auth-link-btn {
    color: #00e5a0;
    text-decoration: none;
    background: none;
    border: none;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s;
  }

  .auth-footer a:hover, .auth-link-btn:hover { opacity: 0.7; }

  .success-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0,229,160,0.08);
    border: 1px solid rgba(0,229,160,0.2);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 12px;
    color: #00e5a0;
    margin-bottom: 20px;
    animation: cardIn 0.3s ease;
  }

  .divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.06);
    margin: 28px 0;
  }
`;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", { name, email, password });
      setSuccess(true);
    } catch {
      alert("Registration failed. Please try again.");
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

          {success && (
            <div className="success-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Account created! You can now log in.
            </div>
          )}

          <div className="auth-label">Get started</div>
          <h1 className="auth-title">Create your<br /><span>account</span></h1>

          <form onSubmit={handleRegister}>
            <div className="field">
              <label className="field-label">Full Name</label>
              <div className="field-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <input
                  className="field-input"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Email</label>
              <div className="field-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  className="field-input"
                  type="email"
                  placeholder="jane@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="field-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>

          <hr className="divider" />

          <div className="auth-footer">
            Already have an account?{" "}
            <button className="auth-link-btn" onClick={() => navigate("/")}>
              Sign in
            </button>
          </div>

        </div>
      </div>
    </>
  );
}