import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("doconnect_currentUser") || "null");
  const currentAdmin = JSON.parse(localStorage.getItem("doconnect_admin") || "null");

  const displayName =
    currentUser?.username || currentUser?.name || currentAdmin?.email || "User";

  const handleLogout = () => {
    localStorage.removeItem("doconnect_currentUser");
    localStorage.removeItem("doconnect_admin");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "#16212b",
        color: "white",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0, fontWeight: "bold", fontSize: "48px" }}>DoConnect</h1>

      <div style={{ marginTop: "15px" }}>
        <Link to="/questions" style={{ color: "white", margin: "0 18px", textDecoration: "none", fontWeight: "600" }}>
          Questions
        </Link>
        <Link to="/ask" style={{ color: "white", margin: "0 18px", textDecoration: "none", fontWeight: "600" }}>
          Ask Question
        </Link>
        <Link to="/chat" style={{ color: "white", margin: "0 18px", textDecoration: "none", fontWeight: "600" }}>
          Chat
        </Link>
        {currentAdmin && (
          <Link to="/admin-dashboard" style={{ color: "white", margin: "0 18px", textDecoration: "none", fontWeight: "600" }}>
            Admin Dashboard
          </Link>
        )}
      </div>

      <div style={{ marginTop: "12px" }}>
        <span style={{ marginRight: "20px", fontWeight: "500" }}>{displayName}</span>
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            color: "#ff7b7b",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
