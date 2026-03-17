import { Link } from "react-router-dom";

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function QuestionCard({ question }) {
  return (
    <div className="question-card">
      <div className="question-card-top">
        <div>
          <Link to={`/questions/${question.id}`} className="question-title">
            {question.title}
          </Link>
          <p className="question-desc">{question.description}</p>
        </div>

        <span className="badge">
          {question.approved === false ? "PENDING" : "APPROVED"}
        </span>
      </div>

      <div className="question-meta">
        <span>Asked by {question.userName || question.username || "user"}</span>
        <span>
          {formatDate(
            question.createdAt || question.createdDate || question.date
          )}
        </span>
      </div>
    </div>
  );
}

export default QuestionCard;