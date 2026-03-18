import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../services/questionService";
import { useNavigate } from "react-router-dom";

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
    } catch (err) {
      console.error(err);
      setQuestions([]);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Questions</h2>

      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q.id}
            style={styles.card}
            onClick={() => navigate(`/question/${q.id}`)}
          >
            <h3 style={styles.title}>{q.title}</h3>
            <p style={styles.desc}>{q.description}</p>
            <small style={styles.user}>By: {q.username}</small>
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
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#f9f9f9",
  },
  title: {
    margin: "0 0 10px 0",
  },
  desc: {
    margin: "0 0 8px 0",
  },
  user: {
    color: "gray",
  },
};

export default QuestionsPage;