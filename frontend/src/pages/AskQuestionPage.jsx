import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AskQuestionPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const userEmail =
      localStorage.getItem("userEmail") ||
      localStorage.getItem("email") ||
      "user@gmail.com";

    if (!title.trim() || !description.trim()) {
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
        throw new Error("Failed to submit question");
      }

      setSuccess("Question submitted successfully. Waiting for admin approval.");
      setTitle("");
      setDescription("");

      setTimeout(() => {
        navigate("/questions");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Discussion service not reachable");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Ask Question</h2>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
            style={styles.input}
          />

          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter question description"
            rows="5"
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Submit Question
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "30px 20px",
    backgroundColor: "#f5f7fb",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  heading: {
    marginTop: 0,
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "14px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    resize: "vertical",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "18px",
    padding: "10px 16px",
    backgroundColor: "#16212b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginTop: "14px",
  },
  success: {
    color: "green",
    marginTop: "14px",
  },
};

export default AskQuestionPage;