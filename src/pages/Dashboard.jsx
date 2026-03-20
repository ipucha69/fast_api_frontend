import { useEffect, useState } from "react";
import API from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .dashboard {
    min-height: 100vh;
    background: #080b10;
    color: #e8eaf0;
    font-family: 'DM Mono', monospace;
    padding: 0;
    overflow-x: hidden;
  }

  /* ── HEADER ── */
  .dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 48px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand-dot {
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

  .brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #fff;
  }

  .user-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    padding: 8px 18px 8px 10px;
    font-size: 13px;
    color: #a0a8b8;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00e5a0, #0077ff);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 13px;
    color: #080b10;
  }

  /* ── HERO SECTION ── */
  .dashboard-hero {
    padding: 64px 48px 48px;
    position: relative;
  }

  .hero-glow {
    position: absolute;
    top: -60px;
    left: -60px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-label {
    font-size: 11px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #00e5a0;
    margin-bottom: 12px;
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 800;
    line-height: 1.05;
    color: #fff;
    margin-bottom: 8px;
  }

  .hero-title span {
    color: #00e5a0;
  }

  .hero-subtitle {
    font-size: 13px;
    color: #505870;
    letter-spacing: 0.02em;
  }

  /* ── STATS ROW ── */
  .stats-row {
    display: flex;
    gap: 16px;
    padding: 0 48px 48px;
  }

  .stat-card {
    flex: 1;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 24px;
    transition: border-color 0.3s;
  }

  .stat-card:hover {
    border-color: rgba(0,229,160,0.3);
  }

  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    color: #fff;
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-value.accent { color: #00e5a0; }

  .stat-label {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #505870;
  }

  /* ── TABLE SECTION ── */
  .table-section {
    padding: 0 48px 64px;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .table-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }

  .fetch-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #00e5a0, #00b87a);
    color: #080b10;
    border: none;
    border-radius: 10px;
    padding: 12px 24px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 0 24px rgba(0,229,160,0.25);
  }

  .fetch-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 0 36px rgba(0,229,160,0.4);
  }

  .fetch-btn:active { transform: translateY(0); }

  .fetch-btn svg { width: 16px; height: 16px; }

  .badge {
    background: rgba(8,11,16,0.4);
    border-radius: 100px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 700;
  }

  /* ── TABLE WRAPPER ── */
  .table-wrap {
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    overflow: hidden;
    background: rgba(255,255,255,0.02);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead tr {
    background: rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  thead th {
    padding: 16px 24px;
    text-align: left;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #505870;
    font-weight: 500;
  }

  thead th:first-child { width: 56px; text-align: center; }

  tbody tr {
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.2s;
    animation: rowIn 0.4s ease both;
  }

  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  tbody tr:last-child { border-bottom: none; }

  tbody tr:hover { background: rgba(0,229,160,0.04); }

  tbody td {
    padding: 16px 24px;
    font-size: 13px;
    color: #c0c8d8;
    vertical-align: middle;
  }

  .row-index {
    text-align: center;
    color: #303850;
    font-size: 12px;
  }

  .name-cell {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .row-avatar {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #0077ff 0%, #00e5a0 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 13px;
    color: #fff;
    flex-shrink: 0;
  }

  .name-text {
    color: #fff;
    font-weight: 500;
  }

  .name-text small {
    display: block;
    font-size: 11px;
    color: #505870;
    font-weight: 400;
    margin-top: 1px;
  }

  .email-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(0,119,255,0.08);
    border: 1px solid rgba(0,119,255,0.2);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 12px;
    color: #6ba3ff;
  }

  .email-chip svg { width: 12px; height: 12px; opacity: 0.7; }

  /* ── EMPTY STATE ── */
  .empty-state {
    text-align: center;
    padding: 72px 24px;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.3;
  }

  .empty-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    opacity: 0.4;
  }

  .empty-desc {
    font-size: 13px;
    color: #303850;
  }

  /* ── LOADING ── */
  .loading-dots {
    display: flex;
    gap: 6px;
    justify-content: center;
    padding: 48px;
  }

  .loading-dots span {
    width: 8px;
    height: 8px;
    background: #00e5a0;
    border-radius: 50%;
    animation: bounce 1.2s infinite ease-in-out;
  }

  .loading-dots span:nth-child(2) { animation-delay: 0.15s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.3s; }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
    40%            { transform: scale(1);   opacity: 1; }
  }
`;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    API.get("/users")
      .then((res) => {
        setUsers(res.data);
        setFetched(true);
      })
      .catch(() => alert("Fetching workmates failed"))
      .finally(() => setLoading(false));
  };

  const getInitials = (name, email) => {
    if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    return email ? email[0].toUpperCase() : "?";
  };

  const avatarGradients = [
    "linear-gradient(135deg,#0077ff,#00e5a0)",
    "linear-gradient(135deg,#ff5f7e,#ff9e3d)",
    "linear-gradient(135deg,#a855f7,#3b82f6)",
    "linear-gradient(135deg,#f59e0b,#ef4444)",
    "linear-gradient(135deg,#10b981,#0ea5e9)",
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">

        {/* HEADER */}
        <header className="dashboard-header">
          <div className="brand">
            <div className="brand-dot" />
            <span className="brand-name">Workmates</span>
          </div>
          {user && (
            <div className="user-pill">
              <div className="avatar">{getInitials(user.name, user.email)}</div>
              {user.email}
            </div>
          )}
        </header>

        {/* HERO */}
        <section className="dashboard-hero">
          <div className="hero-glow" />
          <div className="hero-label">Team Directory</div>
          <h1 className="hero-title">
            Your <span>Workmates</span>
          </h1>
          <p className="hero-subtitle">Browse and connect with everyone on your team.</p>
        </section>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value accent">{users.length}</div>
            <div className="stat-label">Members Loaded</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{user ? 1 : 0}</div>
            <div className="stat-label">You</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{fetched ? "✓" : "–"}</div>
            <div className="stat-label">Directory Synced</div>
          </div>
        </div>

        {/* TABLE */}
        <section className="table-section">
          <div className="table-header">
            <h2 className="table-title">
              Directory{" "}
              {users.length > 0 && (
                <span style={{ color: "#505870", fontWeight: 400, fontSize: 16 }}>
                  ({users.length})
                </span>
              )}
            </h2>
            <button className="fetch-btn" onClick={fetchUsers} disabled={loading}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
              {loading ? "Loading…" : fetched ? "Refresh" : "Load Workmates"}
              {users.length > 0 && <span className="badge">{users.length}</span>}
            </button>
          </div>

          <div className="table-wrap">
            {loading ? (
              <div className="loading-dots">
                <span /><span /><span />
              </div>
            ) : users.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <div className="empty-title">No workmates loaded yet</div>
                <div className="empty-desc">Click "Load Workmates" to fetch your team directory.</div>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id ?? u.email} style={{ animationDelay: `${i * 40}ms` }}>
                      <td className="row-index">{String(i + 1).padStart(2, "0")}</td>
                      <td>
                        <div className="name-cell">
                          <div
                            className="row-avatar"
                            style={{ background: avatarGradients[i % avatarGradients.length] }}
                          >
                            {getInitials(u.name, u.email)}
                          </div>
                          <div className="name-text">
                            {u.name || "—"}
                            <small>Member #{u.id ?? i + 1}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="email-chip">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                          {u.email}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </div>
    </>
  );
}