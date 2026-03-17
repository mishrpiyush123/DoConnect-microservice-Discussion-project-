import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApprovedQuestions } from "../services/questionService";

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getApprovedQuestions();
        setQuestions(response.data || []);
      } catch (err) {
        console.error("Error loading approved questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter((q) =>
    q.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "40px 120px" }}>
      <h2 style={{ marginBottom: "20px" }}>Questions</h2>

      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "280px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          style={{
            padding: "10px 16px",
            backgroundColor: "#66c2ff",
            border: "none",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {filteredQuestions.length === 0 ? (
        <p>No approved questions found.</p>
      ) : (
        filteredQuestions.map((q) => (
          <div key={q.id} style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "5px" }}>
              <Link
                to={`/questions/${q.id}`}
                style={{ textDecoration: "none", color: "#2563eb" }}
              >
                {q.title}
              </Link>
            </h3>

            <p style={{ color: "#666", margin: "5px 0" }}>
              Asked by {q.userName || "user"}
            </p>

            <p style={{ color: "green", fontWeight: "600", margin: 0 }}>
              APPROVED
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionsPage;