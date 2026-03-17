import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AskQuestionPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const userEmail = localStorage.getItem("userEmail");

    if (!title || !description) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          userEmail,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "Failed to post question");
        return;
      }

      alert("Question submitted successfully. Waiting for admin approval.");
      navigate("/questions");
    } catch (err) {
      setError("Discussion service not reachable");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Ask Question</h2>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter question description"
            rows="5"
          />

          <button type="submit">Submit Question</button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}

export default AskQuestionPage;