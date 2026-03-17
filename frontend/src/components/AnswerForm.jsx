import { useState } from "react";

function AnswerForm({ onSubmitAnswer }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await onSubmitAnswer(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-24">
      <h3 className="section-title">Your Answer</h3>

      <div className="form-group">
        <textarea
          placeholder="Write your answer here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post Answer
      </button>
    </form>
  );
}

export default AnswerForm;