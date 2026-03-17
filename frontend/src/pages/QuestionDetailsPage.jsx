import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../services/questionService";
import { addAnswer, getAnswersByQuestionId } from "../services/answerService";

function QuestionDetailsPage() {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const q = await getQuestionById(id);
      const ans = await getAnswersByQuestionId(id);

      setQuestion(q);
      setAnswers(ans);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAnswer({
        questionId: Number(id),
        content,
        userId: Number(localStorage.getItem("userId")),
        username: localStorage.getItem("username"),
      });

      setContent("");
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-content">
      <h2>Question Details</h2>

      {question && (
        <div className="question-card">
          <h3>{question.title}</h3>
          <p>{question.description}</p>
          <p><b>By:</b> {question.username}</p>
        </div>
      )}

      <h3>Answers</h3>

      {answers.length === 0 ? (
        <p>No answers yet.</p>
      ) : (
        answers.map((a) => (
          <div key={a.id} className="question-card">
            <p>{a.content}</p>
            <small>By: {a.username}</small>
          </div>
        ))
      )}

      <form onSubmit={handleAnswerSubmit}>
        <textarea
          rows="4"
          placeholder="Write your answer..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post Answer</button>
      </form>
    </div>
  );
}

export default QuestionDetailsPage;