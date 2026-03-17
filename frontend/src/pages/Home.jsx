import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to DoConnect</h1>
      <p>
        A discussion platform where users can register, ask questions, explore
        answers, and interact with the community.
      </p>

      <div className="home-buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/admin-login")}>Admin Login</button>
      </div>
    </div>
  );
}

export default Home;