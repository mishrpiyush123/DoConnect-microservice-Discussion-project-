import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApprovedQuestions } from "../services/questionService";

function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getApprovedQuestions();
        setQuestions(response.data || []);
      } catch (err) {
        console.error("Error loading approved questions:", err);
        setQuestions([]);
      }
    };

    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter((q) =>
    q.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {filteredQuestions.length === 0 ? (
        <p>No approved questions found.</p>
      ) : (
        filteredQuestions.map((q) => (
          <div key={q.id} style={styles.card}>
            <h3 style={styles.title}>
              <Link to={`/question/${q.id}`} style={styles.link}>
                {q.title}
              </Link>
            </h3>

            <p style={styles.userText}>
              Asked by {q.userName || q.username || "user"}
            </p>

            <p style={styles.status}>APPROVED</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  searchBox: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    margin: "0 0 8px 0",
  },
  link: {
    textDecoration: "none",
    color: "#222",
  },
  userText: {
    color: "#666",
    margin: "0 0 8px 0",
  },
  status: {
    color: "green",
    fontWeight: "bold",
    margin: 0,
  },
};

export default AdminDashboard;