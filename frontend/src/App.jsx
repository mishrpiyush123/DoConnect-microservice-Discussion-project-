import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";


function Navbar({ isAdmin = false }) {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || (isAdmin ? "admin@gmail.com" : "user@gmail.com");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate(isAdmin ? "/admin-dashboard" : "/questions")}>
        DoConnect
      </div>

      <div className="nav-links">
        <button onClick={() => navigate("/questions")}>Questions</button>
        <button onClick={() => navigate("/ask-question")}>Ask Question</button>
        <button onClick={() => navigate("/chat")}>Chat</button>
        {(isAdmin || role === "ADMIN") && (
          <button onClick={() => navigate("/admin-dashboard")}>Admin Dashboard</button>
        )}
      </div>

      <div className="nav-user">
        <span>{userEmail}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    localStorage.setItem("token", "user-demo-token");
    localStorage.setItem("role", "USER");
    localStorage.setItem("userEmail", email);

    navigate("/questions");
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <button type="submit">Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p className="bottom-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setMessage("Please fill all fields");
      return;
    }

    setMessage("Registration successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          <button type="submit">Register</button>
        </form>

        {message && <p className="success-text">{message}</p>}

        <p className="bottom-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

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

function QuestionsPage() {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <h2>Questions</h2>

        <div className="search-row">
          <input type="text" placeholder="Search questions..." />
          <button>Search</button>
        </div>

        <p>No approved questions found.</p>
      </div>
    </>
  );
}

function AskQuestionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

 

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await createQuestion({
      title,
      description,
      userId: Number(localStorage.getItem("userId")),
      username: localStorage.getItem("username"),
    });

    setMessage("Question submitted successfully");
    setTitle("");
    setDescription("");
  } catch (err) {
    console.error(err);
    setMessage("Error submitting question");
  }
};

  return (
    <>
      <Navbar />
      <div className="page-content form-content">
        <h2>Ask Question</h2>

        <form className="question-form" onSubmit={handleSubmit}>
          <label>Question Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
          />

          <label>Question Description</label>
          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter question description"
          ></textarea>

          <button type="submit">Submit Question</button>
        </form>

        {message && <p className="success-text">{message}</p>}
      </div>
    </>
  );
}

function ChatPage() {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <h2>Discussion Chat</h2>
        <p>Chat section will appear here.</p>
      </div>
    </>
  );
}

function AdminDashboard() {
  return (
    <>
      <Navbar isAdmin={true} />
      <div className="page-content">
        <h2>Admin Dashboard</h2>
        <p>Pending questions will appear here for approval.</p>
      </div>
    </>
  );
}

function NotFound() {
  return (
    <div className="page-container">
      <h2>404 - Page Not Found</h2>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/ask-question" element={<AskQuestionPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;