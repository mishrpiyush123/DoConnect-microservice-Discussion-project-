import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail") || "User";
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>DoConnect</h1>

      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/questions" style={styles.link}>Questions</Link>
        <Link to="/ask-question" style={styles.link}>Ask Question</Link>
        <Link to="/chat" style={styles.link}>Chat</Link>

        {role === "ADMIN" && (
          <Link to="/admin-dashboard" style={styles.link}>
            Admin Dashboard
          </Link>
        )}
      </div>

      <div style={styles.userSection}>
        <span style={styles.userName}>{userEmail}</span>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#16212b",
    color: "white",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
  },
  logo: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "28px",
  },
  linksContainer: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    padding: "8px 12px",
    borderRadius: "6px",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  userName: {
    fontWeight: "500",
    fontSize: "16px",
  },
  logoutButton: {
    background: "none",
    border: "1px solid #ff7b7b",
    color: "#ff7b7b",
    cursor: "pointer",
    fontWeight: "600",
    padding: "8px 12px",
    borderRadius: "6px",
  },
};

export default Navbar;