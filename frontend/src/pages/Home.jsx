import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <p style={styles.badge}>Microservices-based Q&A Platform</p>

          <h1 style={styles.heading}>Welcome to DoConnect</h1>

          <p style={styles.subtext}>
            A discussion platform where users can register, ask questions,
            explore answers, and interact with the community in a simple and
            structured way.
          </p>

          <div style={styles.buttonRow}>
            <button style={styles.primaryButton} onClick={() => navigate("/login")}>
              Login
            </button>

            <button style={styles.secondaryButton} onClick={() => navigate("/register")}>
              Register
            </button>

            <button style={styles.darkButton} onClick={() => navigate("/admin-login")}>
              Admin Login
            </button>
          </div>

          <div style={styles.infoRow}>
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Ask Questions</h3>
              <p style={styles.infoText}>Post your doubts and get community support.</p>
            </div>

            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Admin Approval</h3>
              <p style={styles.infoText}>Content can be moderated before publishing.</p>
            </div>

            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Discussion Chat</h3>
              <p style={styles.infoText}>Interact with users through chat and discussion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #e0ecff 0%, #f8fbff 45%, #eef4ff 100%)",
    padding: "30px 16px",
    boxSizing: "border-box",
  },
  overlay: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: "20px",
    padding: "50px 30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    margin: "0 0 18px 0",
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: "600",
    fontSize: "14px",
  },
  heading: {
    margin: "0 0 16px 0",
    fontSize: "56px",
    fontWeight: "800",
    color: "#0f172a",
    lineHeight: "1.1",
  },
  subtext: {
    maxWidth: "820px",
    margin: "0 auto 28px auto",
    fontSize: "22px",
    color: "#475569",
    lineHeight: "1.6",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "38px",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "13px 26px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    minWidth: "140px",
  },
  secondaryButton: {
    backgroundColor: "#0ea5e9",
    color: "white",
    border: "none",
    padding: "13px 26px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    minWidth: "140px",
  },
  darkButton: {
    backgroundColor: "#0f172a",
    color: "white",
    border: "none",
    padding: "13px 26px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    minWidth: "160px",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginTop: "10px",
  },
  infoCard: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "22px",
    textAlign: "left",
  },
  infoTitle: {
    margin: "0 0 10px 0",
    color: "#0f172a",
    fontSize: "20px",
  },
  infoText: {
    margin: 0,
    color: "#64748b",
    lineHeight: "1.5",
    fontSize: "15px",
  },
};

export default Home;