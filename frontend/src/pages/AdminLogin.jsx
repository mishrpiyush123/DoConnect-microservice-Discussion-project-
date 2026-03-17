import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("token", "admin-demo-token");
      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("userEmail", email);
      navigate("/admin-dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleAdminLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
          />

          <button type="submit">Admin Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;