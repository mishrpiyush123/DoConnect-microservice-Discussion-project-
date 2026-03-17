import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../services/questionService";

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);

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
    <div className="page-content">
      <h2>Questions</h2>

      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <div>
          {questions.map((q) => (
            <div key={q.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
              <h3>{q.title}</h3>
              <p>{q.description}</p>
              <small>By: {q.username}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionsPage;