function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function AnswerList({ answers }) {
  if (!answers || answers.length === 0) {
    return <p className="mt-16">No approved answers yet. Be the first to answer!</p>;
  }

  return (
    <div className="mt-16">
      {answers.map((answer) => (
        <div className="answer-box" key={answer.id}>
          <p>{answer.content}</p>
          <div className="answer-meta">
            Answered by {answer.userName || answer.username || "user"}{" "}
            {formatDate(answer.createdAt || answer.createdDate || answer.date)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnswerList;